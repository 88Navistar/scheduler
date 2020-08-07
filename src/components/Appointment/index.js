import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import "components/Appointment/Confirm";
import Show from "components/Appointment/Show";
import "components/Appointment/Status";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode"


export default function Appointment(props) {
  const {time, interview} = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={[interview.interviewer]} /> 
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} //changed to props.interviews after helper function 
        //onSave={save} or similar
        onCancel={(event) => back()}
        />
      )}
    </article>
  )}