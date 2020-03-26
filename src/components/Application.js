import React from 'react';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import 'components/Application.scss';
import useApplicationData from 'hooks/useApplicationData';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import { transform } from '@babel/core';

/* const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },

  {
    id: 3,
    time: '1pm',
  },
  {
    id: 4,
    time: '2pm',
    interview: {
      student: 'Adolf Shitler',
      interviewer: {
        id: 2,
        name: 'Hulk Hogan',
        avatar: 'https://puu.sh/FmIbR/313aa3f148.png',
      },
    },
  },
  {
    id: 5,
    time: '5pm',
  },
  {
    id: 6,
    time: '3pm',
    interview: {
      student: 'Ricky Bobby',
      interviewer: {
        id: 3,
        name: 'Jean Girard',
        avatar: 'https://puu.sh/FmIi3/31bb0e4de0.png',
      },
    },
  },
]; */

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  const appointment = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentList = appointment.map((app) => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment
        key={app.id}
        id={app.id}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointmentList}

        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
