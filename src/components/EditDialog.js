import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

export default function FormDialog({
  ed_issueID,
  ed_issueName,
  ed_issueState,
  opened,
  setOpened,
}) {

  const dispatch = useDispatch();
  const paperStyle = {
    padding: "50px 20px",
    width: "calc(100%-40px)",
    margin: "20px auto",
  };
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setIssueState] = useState("");
  const [issueRes, setRes] = useState([]);
  var data = [];
  const [issueOldIssue, setOldIssue] = useState([]);
  const [availbleStatus, setAvailabeStatus] = useState([]);


  const [issues, setIssues] = useState([]);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    (async () => {
      if (!ed_issueID) return;
      const res = await fetch("issue/getIssueForUpdate/" + ed_issueID);
      const data = await res.json();
      setRes(data);
      setAvailabeStatus(data.availableStatus);
      setOldIssue(data.issue);    })();
    setOpen(opened);
  }, [opened]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const issue = { issueName, description, state };
    console.log(issue);

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(issue),
    // };
    // fetch("issue/add", requestOptions).then(() => {
    //   console.log("New Issue is Added");
    // });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Issue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            # {ed_issueID}
          </DialogContentText>
          <form
          style={{ margin: "10px 0px", padding: "10px 0" }}
          noValidate
          autoComplete="off"
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "80%", margin: "10px 5px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              value={issueOldIssue.issueName}
              onChange={(e) => setIssueName(e.target.value)}
              label="Issue Name"
              variant="outlined"
              fullWidth
              className="paper-inpt-fields"
            />
            <TextField
              id="outlined-basic"
              value={issueOldIssue.description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              type="text"
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
                value={issueOldIssue.state}
                label="State"
                onChange={(e) => setIssueState(e.target.value)}
              >
                <MenuItem value={ed_issueState}>{issueOldIssue.state}</MenuItem>
                  {availbleStatus.map((i) => (
                    <MenuItem value={i}>{i}</MenuItem>
                  ))}            
                  </Select>
            </FormControl>
            {/* default state need to set as OPEN */}
            <Stack
              spacing={2}
              direction="rtl"
              style={{ margin: "auto", direction: "rtl" }}
            >
              <Button variant="contained" color="primary" onClick={handleClick}>
                Create
              </Button>
            </Stack>
          </Box>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
