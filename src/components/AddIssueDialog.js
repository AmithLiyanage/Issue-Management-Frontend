import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { getPieData } from "../state/actions";
import { getIssueListData } from "../state/actions";
import { useSelector, useDispatch } from "react-redux";
import Recaptcha from 'react-google-invisible-recaptcha';
import { GoogleReCaptcha, GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

// constructor( props ) {
//   super( props );
//   this.state = { value: '' };
//   this.onSubmit = this.onSubmit.bind( this );
//   this.onResolved = this.onResolved.bind( this );
// }




export default function FormDialog({ opened, setOpened }) {

  const dispatch = useDispatch();
  const filterTypeData = useSelector((state => state.data.issueListType));
  const [nextIssueId, setRes] = useState("");
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const submittedBy = useSelector((state => state.authData.email));
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch("issue/getNextIssueId");//to display next issue id
      const data = await res.json();
      setRes(data);
    })();
    setOpen(opened);
  }, [opened]);



  //form validation
  // state = {
  //   formData: {
  //     email: '',
  //   },
  //   submitted: false,
  // }

  // handleChange = (event) => {
  //   const { formData } = this.state;
  //   formData[event.target.name] = event.target.value;
  //   this.setState({ formData });
  // }

  // handleSubmit = () => {
  //   this.setState({ submitted: true }, () => {
  //     setTimeout(() => this.setState({ submitted: false }), 5000);
  //   });
  // }

  const onSubmit = () => {
    if ('' == this.state.value) {
      alert('Validation failed! Input cannot be empty.');
      this.recaptcha.reset();
    } else {
      this.recaptcha.execute();
    }
  }
  const onResolved = () => {
    alert('Recaptcha resolved with response: ' + this.recaptcha.getResponse());
  }


  const handleClose = () => {
    setOpened(false)
  };

  const handleClickSave = (e) => {
    e.preventDefault();
    const issue = { issueName, description, type, submittedBy };
    console.log(issue);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(issue),
    };
    fetch("issue/add", requestOptions).then(() => {
      console.log("New Issue is Added");
      getPieData({ submittedBy })(dispatch);
      getIssueListData({ filterTypeData })(dispatch);
    });
    setOpened(false)
  };

  const YourReCaptchaComponent = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = React.useCallback(async () => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }

      const token = await executeRecaptcha('yourAction');
      // Do whatever you want with the token
    }, []);

    // You can use useEffect to trigger the verification as soon as the component being loaded
    useEffect(() => {
      handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    return <button onClick={handleReCaptchaVerify}>Verify recaptcha</button>;
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Issue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            # {nextIssueId}
          </DialogContentText>
          <form
            style={{ margin: "10px 0px", padding: "10px 0" }}
            noValidate
            autoComplete="off"
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100%", margin: "10px 5px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                value={issueName}
                onChange={(e) => setIssueName(e.target.value)}
                label="Issue Name"
                variant="outlined"
                fullWidth
                className="paper-inpt-fields"
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextField
                id="outlined-basic"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
                variant="outlined"
                fullWidth
                className="paper-inpt-fields"
              />
              <FormControl fullWidth>
                {/* // see: https://mui.com/system/the-sx-prop/ */}
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={"BUG"}>Bug</MenuItem>
                  <MenuItem value={"QUESTION"}>Question</MenuItem>
                  <MenuItem value={"IMPROVEMENT"}>Improvement</MenuItem>
                </Select>
              </FormControl>
              <Stack
                spacing={2}
                direction="rtl"
                style={{ margin: "auto", direction: "rtl" }}
              >
              </Stack>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <GoogleReCaptchaProvider reCaptchaKey="[6LfXpLseAAAAACPwt5u9Kxl_VE6fUG7X_KqPGkMG]">
            {/* <YourReCaptchaComponent /> */}
            <Button onClick={handleClickSave}>Save</Button>
          </GoogleReCaptchaProvider>
        </DialogActions>
      </Dialog>
    </div>

  );
}
