import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode"
//import axios from "axios";


export default function Appointment(props) {
  const {time, interview} = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE"
  

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
   
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  function onDelete() {
    transition(CONFIRM)
  }
  function edit() {
    transition(EDIT)
  }
  function cancel() {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }
  

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={(event) => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={[props.interview.interviewer]}
          onDelete={onDelete}
          onEdit={edit}
        />
         
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} 
        onSave={save}
        onCancel={(event) => back()}
        />
      )}
      {mode === EDIT && (
        <Form
        student={props.interview.student} 
        interviewer={[props.interview.interviewer.id]}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={(event) => back()}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Deleting can't be undone, are you sure?"
          onCancel={(event) => back()}
          onConfirm={cancel} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Try again, couldn't save"} onClose={() => back()} />
      )}
      
    </article>
  )}