import * as actions from "../actions/actionTypes";

const initialState = {
  pieChartData: [],
  issueListType: "ALL"
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.getPieChartDataAction.SUCCESS:
      return {
        ...state,
        pieChartData: payload,
      };
    case actions.getIssueListDataAction.SUCCESS:
      state.issueListType = "Open"
      return {
        ...state,
        issueListType: payload,
      };
    case actions.setIssueListDataAction.SUCCESS:
      return {
        ...state,
        issueListType: payload,
      };
    case "tmpLabel":
      return "OPEN";

    default:
      return state;
  }
};

export default authReducer;
