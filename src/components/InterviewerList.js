import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  const interviewerList = interviewers.map((person) => {
    return (
      <InterviewerListItem
        key={person.id}
        id={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id === value}
        setInterviewer={() => onChange(person.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{interviewerList}</h4>
      <ul className="interviewers__list" />
    </section>
  );
}
