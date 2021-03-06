import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// Rendered in index.js when creating a new appointment,  Used to set interviwer and student name
export default function Form(props) {
  const {interviewers, onCancel, onSave } = props;
  const [name, setName] = React.useState(props.name || "");
  const [interviewer, setInterviewer] = React.useState(props.interviewer || null);
  const [error, setError] = React.useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  
  const cancel = () => {
    reset();
    onCancel();
  };
  
  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}