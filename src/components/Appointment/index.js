import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Error from 'components/Appointment/Error';

import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import { transform } from '@babel/core';
const SHOW = 'SHOW';
const EMPTY = 'EMPTY';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const ERROR = 'ERROR';
export default function Appointment(props) {
  const { time, interview, id } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  function onAdd() {
    transition(CREATE);
  }
  function onCancel() {
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(id, interview).then(() => {
      transition(SHOW);
    });
  }
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={onCancel} />}
      {mode === ERROR && <Error />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer.name} />}
      {mode === SAVING && <Status message={'hello there i am saving'} />}
    </article>
  );
}
