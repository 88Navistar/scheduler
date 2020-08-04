import React from 'React';
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  const { interviewers, value, onChange} = props;
  const eachInterviewer = interviewers.map(({ id, name, avatar }) => {
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={id === value}
        setInterviewer={(event) => onChange(id)}
      />
    )
  })
  
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{eachInterviewer}</ul>
</section>
  )
}

export default InterviewerList;