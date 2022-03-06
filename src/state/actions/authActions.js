import * as actions from "./actionTypes";

//https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
export const signIn =
  ({ name, email, imageUrl }) =>
  async (dispatch) => {
    try {
      dispatch(actions.signInAction.success({ name, email, imageUrl }));
    } catch (e) {
      console.log(e);
    }
  };

export const signOut = () => (dispatch) => {
  try {
    localStorage.removeItem("accessToken");
    dispatch(actions.signOutAction.success());
  } catch (e) {
    console.log(e.message);
  }
};
