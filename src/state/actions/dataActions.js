import * as actions from "./actionTypes";

export const getPieData = () => async (dispatch) => {
  try {
    const res = await fetch("/issue/getStatusOfIssues");
    const result = await res.json();
    dispatch(actions.getPieChartDataAction.success(result));
  } catch (e) {
    console.log(e.message);
  }
};
