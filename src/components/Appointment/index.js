import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Error from 'components/Appointment/Error';
import Confirm from 'components/Appointment/Confirm';

import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';

const SHOW = 'SHOW';
const EMPTY = 'EMPTY';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const ERROR = 'ERROR';
const CONFIRM = 'CONFIRM';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
export default function Appointment(props) {
  const { time, interview, id, bookInterview, cancelInterview } = props;
  //  console.log(`props check ${JSON.stringify(props)}`);

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function onAdd() {
    transition(CREATE);
  }
  function onCancel() {
    back();
  }

  function deleteInterview() {
    transition(DELETE, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => transition(ERROR_DELETE, true));
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW)).catch(() => transition(ERROR_SAVE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => transition(EMPTY)} />}
      {mode === SHOW &&
      interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === CONFIRM && (
        <Confirm onCancel={onCancel} message={'Are you sure you would like to delete?'} onConfirm={deleteInterview} />
      )}
      {mode === DELETE && <Status message={'Deleting'} />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
          name={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && <Error message={'error saving stuff'} onClose={() => transition(EMPTY)} />}
      {mode === ERROR_DELETE && <Error message={'error on deleting your stuff'} onClose={onCancel} />}
    </article>
  );
}
