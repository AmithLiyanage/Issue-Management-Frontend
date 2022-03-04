import * as actions from "../actions/actionTypes";

const initialState = {
  pieChartData: [],
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.getPieChartDataAction.SUCCESS:
      return {
        ...state,
        pieChartData: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
