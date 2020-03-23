import React from 'react';
import 'components/InterviewerListItem.scss';
import className from 'classnames';

export default function InterviewListItem(props) {
  const { selected, setInterviewer, name, avatar } = props;
  const InterviewClass = className('interviewers__item', {
    'interviewers__item--selected': selected,
  });
  return (
    <li className={InterviewClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
