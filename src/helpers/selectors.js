export function getAppointmentsForDay(state, day) {
  const apptArr = [];
  const filteredDays = state.days.filter((x) => x.name === day);
  if (filteredDays.length === 0) return [];
  const apptForDay = filteredDays[0].appointments;
  for (const appts of apptForDay) {
    if (state.appointments[appts]) {
      apptArr.push(state.appointments[appts]);
    }
  }
  return apptArr;
}
//return an object containing the object interviewer data
export function getInterview(state, interview) {
  if (interview && state) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  } else {
    return null;
  }
}
//by the power of paste I HAVE TWO FUNCTIONS!
//that do the same but slightly different things

export function getInterviewersForDay(state, day) {
  const interviewArr = [];
  const daysStuff = state.days.filter((x) => x.name === day);
  if (daysStuff.length === 0) return [];
  const interviewForDay = daysStuff[0].interviewers;
  for (const int of interviewForDay) {
    if (state.interviewers[int]) {
      interviewArr.push(state.interviewers[int]);
    }
  }
  return interviewArr;
}
