import React from 'react';
import 'components/DayListItem.scss';
import className from 'classnames';
export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const spotCheck = (spots) => {
    if (spots === 0) {
      return 'no spots left sam';
    }
    return spots === 1 ? `${spots} singular spot sam` : `${spots} several spot sam `;
  };
  const dayList = className('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });
  return (
    <li className={dayList} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name} </h2>
      <h3 className="text-light"> {spotCheck(spots)}</h3>
    </li>
  );
}
