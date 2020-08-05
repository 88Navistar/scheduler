import React from "react"
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
  const [name, setName] = React.useState(props.name || null);
  const [interviewer, setInterviewer] = React.useState(props.interviewer || null);
  const [error, setError] = React.useState("");
  
  const reset = () => {setName(""); setInterviewer(null);};
  const cancel = () => {props.onCancel(reset())};
  const validate = () => {
    if (name === "") {
      setError("Please enter your name");
      return;
    } else {
      setError("");
      props.onSave(name, interviewer)
    }
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.taget.value)}
            /*
              This must be a controlled component
            */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        onChange={(event) => setInterviewer(event)} />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
              <Button onClick={cancel} danger>Cancel</Button>
              <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}