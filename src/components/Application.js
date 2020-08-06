import React, { useState, useEffect } from "react";
import "components/Application.scss";
//import InterviewList from "./InterviewerList"
import Appointment from "./Appointment"
import DayList from "./DayList";
//import getAppointmentsForDay from ".helpers/selectors"
import axios from "axios"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

const appointment = appointments.map((appointment) => {
  return (
    <Appointment key={appointment.id} {...appointment} />
  )
})


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    //interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  //const setDays = days => (prev => ({ ...prev, days }));
  //const [day, setDay] = useState("Monday");
  //const [days, setDays] = useState([])

  useEffect(() => {
    Promise.all([axios.get('/api/days'), (axios.get('/api/appointments'))])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
    })
  }, []);
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
