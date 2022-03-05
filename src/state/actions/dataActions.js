import * as actions from "./actionTypes";

let listType = "ALL"

export const getPieData = () => async (dispatch) => {
  try {
    const res = await fetch("/issue/getStatusOfIssues");
    const result = await res.json();
    dispatch(actions.getPieChartDataAction.success(result));
  } catch (e) {
    console.log(e.message);
  }
};

export const getIssueListData = ({label}) => async (dispatch) => {
  console.log("label in data action : "+label);
  try {
    listType = label;
    console.log("label : "+listType);
    dispatch(actions.getIssueListDataAction.success(label));
  } catch (e) {
    console.log(e.message);
  }
};

export const setIssueListData = () => async (dispatch) => {
  // console.log("listType : "+listType);
  try {
    dispatch(actions.setIssueListDataAction.success(listType));
  } catch (e) {
    console.log(e.message);
  }
};

export const tmplabel = () => {
  return (dispatch) => {
      dispatch({
          type: "tmpLabel",
          payload: listType
      })
  }
}



