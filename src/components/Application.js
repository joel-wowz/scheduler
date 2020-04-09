import React from 'react';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import 'components/Application.scss';
import useApplicationData from 'hooks/useApplicationData';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import { transform } from '@babel/core';

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
