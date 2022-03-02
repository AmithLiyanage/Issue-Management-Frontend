import * as actions from "../actions/actionTypes";

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  authenticated: !!localStorage.getItem("accessToken"),
  loading: false,
  name: null,
  error: null,
  email: null,
  imageUrl: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.signInAction.SUCCESS:
      return {
        ...state,
        accessToken: payload.accessToken,
        name: payload.name,
        authenticated: true,
        email: payload.email,
        imageUrl: payload.imageUrl,
        loading: false,
        error: false,
      };

    case actions.signOutAction.SUCCESS:
      return {
        accessToken: null,
        authenticated: false,
        loading: false,
        name: null,
        error: null,
        email: null,
        imageUrl: null,
      };

    default:
      return state;
  }
};

export default authReducer;
