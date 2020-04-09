import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';
export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [ name, setName ] = useState(props.name || '');
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);
  const [ error, setError ] = useState('');

  const reset = () => {
    setName('');
    setInterviewer('null');
  };
  const cancel = () => {
    onCancel();
    reset();
  };

  function validate() {
    if (name === '') {
      setError('Student Name Cannot be blank');
      return;
    }
    if (!interviewer) {
      setError('Interviewer Cannot be empty');
      return;
    }
    setError('');
    onSave(name, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            /*
          This must be  a controlled com   ponent
        */
            data-testid="student-name-input"
          />

          {error}
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      {name}
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button onClick={() => validate()} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
