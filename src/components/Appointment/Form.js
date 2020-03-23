import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';
export default function Form(props) {
  const { interviewers, onCancel, onSave } = props;
  const [ name, setName ] = useState(props.name || '');
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);
  const reset = () => {
    setName('');
    setInterviewer('null');
  };
  const cancel = () => {
    reset();
    onCancel();
  };
  const saveData = () => {
    onSave(name, interviewer);
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
            /*
          This must be  a controlled com   ponent
        */
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      {name}
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => saveData()} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
