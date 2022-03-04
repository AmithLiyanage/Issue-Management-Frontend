import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signIn, signOut } from "../state/actions";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";

export default function ButtonAppBar() {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    signIn({
      name: res.profileObj.name,
      email: res.profileObj.email,
      imageUrl: res.profileObj.imageUrl,
    })(dispatch);
  };

  const onFailure = () => {
    signOut()(dispatch);
  };

  const onLogoutSuccess = () => {
    signOut()(dispatch);
  };

  const authenticated = useSelector(
    ({ authData: { authenticated } }) => authenticated
  );
  const name = useSelector(({ authData: { name } }) => name);
  const imageUrl = useSelector(({ authData: { imageUrl } }) => imageUrl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Issue Management System
          </Typography>
          {authenticated && (
            <>
              <Avatar src={imageUrl}  style={{ marginRight: "18px", direction: "rtl"}}/>{" "}
              <Typography variant="p" component="div" sx={{ flexGrow: 1 }}
                style={{ marginRight: "18px", direction: "rtl", flexGrow: "0" }}>
                {name}
              </Typography>
            </>
          )}
          {authenticated ? (
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={onLogoutSuccess}
            />
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              style={{ marginTop: "100px" }}
              isSignedIn={true}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
