import * as actions from "./actionTypes";

let listType = "ALL"

export const getPieData = ({submittedBy}) => async (dispatch) => {
  try {
    const res = await fetch("/issue/getStatusOfIssues?submittedBy="+submittedBy);
    const result = await res.json();
    dispatch(actions.getPieChartDataAction.success(result));
  } catch (e) {
    console.log(e.message);
  }
};

export const getIssueListData = ({label}) => async (dispatch) => {
  // console.log("label in data action : "+label);
  try {
    listType = label;
    dispatch(actions.getIssueListDataAction.success(label));
  } catch (e) {
    console.log(e.message);
  }
};

// export const setIssueListData = () => async (dispatch) => {
//   try {
//     dispatch(actions.setIssueListDataAction.success(listType));
//   } catch (e) {
//     console.log(e.message);
//   }
// };




