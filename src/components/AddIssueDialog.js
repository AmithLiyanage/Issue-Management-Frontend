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

export default function FormDialog({ opened, setOpened }) {
  const dispatch = useDispatch();
  const filterTypeData = useSelector((state => state.data.issueListType));
  const [nextIssueId, setRes] = useState("");
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const submittedBy = useSelector((state => state.authData.email));

  const [open, setOpen] = React.useState(false);

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
          <Button onClick={handleClickSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
