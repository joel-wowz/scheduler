import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useApplicationData() {
  const [ state, setState ] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState((state) => ({ ...state, day }));

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({ ...state, appointments });

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments });
    });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({
      ...state,
      appointments,
    });

    return axios.put(`/api/appointments/${id}`, { appointment }).then(() => {
      setState({ ...state, appointments });
    });
  }

  useEffect(
    () => {
      const fetchDays = axios.get('/api/days');
      const fetchAppointments = axios.get('/api/appointments');
      const fetchInterviewers = axios.get('/api/interviewers');
      Promise.all([
        Promise.resolve(fetchDays),
        Promise.resolve(fetchAppointments),
        Promise.resolve(fetchInterviewers),
      ]).then((all) => {
        //data for each promise in order of the above.
        const [ days, appointments, interviewers ] = all;

        setState((state) => ({
          ...state,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        }));
      });
    },
    [ state.appointments ],
  );

  return { bookInterview, cancelInterview, state, setDay };
}
