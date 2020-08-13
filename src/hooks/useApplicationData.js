import { useState, useEffect } from 'react';
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

//Rendered in application.js, this custom hook contains multiple helper functions and includes the API calls
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const [errorMsg, setErrorMsg] = useState('');
  
//Updates local state and puts data to API
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        const newState = {...state, appointments};
        const updatedSpots = calcSpots(newState);

        setState(updatedSpots);
      });
  }
//Update local state and delete interview from API
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        const newState = {...state, appointments};
        const updatedSpots = calcSpots(newState);

        setState(updatedSpots);
      });
  
  }
// API call to retrieve data
  useEffect(() => {
    Promise.all([axios.get('/api/days'), (axios.get('/api/appointments')),(axios.get('/api/interviewers'))])
      .then(all => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
      .catch(err => {
        setErrorMsg("Error loading data");
      });
  }, []);
  
//Helper function to update available appointmnets on each day.
  function calcSpots(newState) {
    const currentDay = state.days.findIndex(day => state.day === day.name);
    const spots = getAppointmentsForDay(newState, newState.days[currentDay].name);
    const availSpots = spots.filter(appointment => {
      return appointment.interview === null;
    });

    const daysCopy = [...state.days];
    daysCopy[currentDay].spots = availSpots.length;

    return {...newState, days: daysCopy };
  }

  return { state, setDay, bookInterview, cancelInterview, errorMsg };
}