import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import "components/Appointment/Confirm";
import Show from "components/Appointment/Show";
import "components/Appointment/Status";
import "components/Appointment/Form";


export default function Appointment(props) {
  const {time, interview} = props;
  return (
    <article className="appointment">
      <Header time={time} />
      { interview ? 
        <Show student={interview.student} interviewer={[interview.interviewer]} /> 
        : <Empty/> 
      }
    </article>
  )
}