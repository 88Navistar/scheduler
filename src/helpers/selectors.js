
// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const filterdedDays = state.days.filter(singleDay => {
    return singleDay.name === day;
  });

  if (filterdedDays.length === 0) {
    return [];
  }
  const dayAppt = filterdedDays[0].appointments;
  const appointments = dayAppt.map(appt => {
    return state.appointments[appt]
  })
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const finalInterview = {
    ...interview,
    interviewer: {
      ...state.interviewers[interview.interviewer]
    }
  };
  return finalInterview;
};