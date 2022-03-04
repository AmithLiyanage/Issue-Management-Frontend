import createRoutine from "redux-routines";

export const signInAction = createRoutine("USER_LOGIN");
export const signOutAction = createRoutine("USER_LOGOUT");

export const getPieChartDataAction = createRoutine("GET_PIE_CHART_DATA");
