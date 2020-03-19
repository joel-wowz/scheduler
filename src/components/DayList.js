import React from 'react';
import DayListItem from 'components/DayListItem';
export default function DayList(props) {
  const { day, days, setDay } = props;
  const dayList = days.map((list) => {
    return <DayListItem name={list.name} spots={list.spots} selected={list.name === day} setDay={setDay} />;
  });
  return dayList;
}
