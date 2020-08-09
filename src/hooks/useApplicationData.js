import { useState, useEffect } from 'react';
import axios from "axios";
//import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const [errorMsg, setErrorMsg] = useState('');
  
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
        return setState({
          ...state,
          appointments
        });
      })
  } 
  function cancelInterview(id){
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
        setState({
          ...state,
          appointments
        });
        return response;
      })
  }
  useEffect(() => {
    Promise.all([axios.get('/api/days'), (axios.get('/api/appointments')),(axios.get('/api/interviewers'))])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
    .catch(err => {
      setErrorMsg("Error loading data");
    })
  }, []);
  

  // function spotsRemaining(newState) {
  //    const currentDay = state.days.findIndex(day => state.day === day.name)
  //    console.log(getAppointmentsForDay(newState, newState.days[currentDay].name));
  //   return newState;
  //  }
  //  spotsRemaining()

  return { state, setDay, bookInterview, cancelInterview, errorMsg };
}