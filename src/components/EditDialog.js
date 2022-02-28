import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

export default function FormDialog({ ed_issueID, ed_issueName, ed_issueState, opened, setOpened }) {
  const [open, setOpen] = React.useState(opened);
  const [issueRes, setRes] = useState([])
  var data = [];
  const [issueOldIssue, setOldIssue] = useState([])
  const [availbeStatus, setAvailabeStatus] = useState([])

  // useEffect(() => {
  //   console.log("ed_issueID : "+ed_issueID)
  //   fetch("http://localhost:8080/issue/getIssueForUpdate/"+ed_issueID)
  //     .then(res => res.json())
  //     .then((result) => {
  //       setOldData(result);
  //     })
  //     console.log("from bc : "+issueOldData)
  // }, [])

  //get data after opened
  // React.useEffect(() => {
  //   fetch("http://localhost:8080/issue/getIssueForUpdate/" + ed_issueID)
  //     .then(res => res.json())
  //     .then((result) => {
  //       setRes(result);
  //     })
  //   console.log("from bc : " + issueOldData)
  //   setOpen(opened)
  // }, [opened])

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/issue/getIssueForUpdate/" + ed_issueID)
      .then(res => res.json())
      .then((result) => {
        setRes(result);
      })
      const data = await res.json()
      const newStatus = data.map(obj => (obj.availableStatus))
      const oldIssue = data.map(obj => (obj.count))
      console.log("from bc : " + newStatus)
      console.log("from bc : " + oldIssue)
      setAvailabeStatus(newStatus)
      setOldIssue(oldIssue)
    })()
    console.log("from data" + data)
    setOpen(opened)
  }, [opened])


  React.useEffect(() => {
    console.log(ed_issueID)
  }, [ed_issueID])

  React.useEffect(() => {
    console.log(ed_issueName)
  }, [ed_issueName])

  React.useEffect(() => {
    console.log(ed_issueState)
  }, [ed_issueState])


  const handleClose = () => {
    setOpened(false)
  };

  const handleClick = (e) => {
    e.preventDefault()
    const issue = {  }
    console.log(issue)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issue)
    };
    fetch("http://localhost:8080/issue/add", requestOptions)
        .then(() => {
            console.log("New Issue is Added")
        })
}

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Issue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            #{ed_issueID} {ed_issueName} {ed_issueState}
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            value={ed_issueName}
            label="Issue Name"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <form style={{ margin: '10px 0px', padding: '10px 10' }} noValidate autoComplete="off">
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '100%', margin: '10px 5px' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                value={ed_issueName}
                // onChange={(e) => setIssueName(e.target.value)}
                label="Issue Name"
                type="text"
                variant="outlined"
                fullWidth
                className='paper-inpt-fields'
              />
              <TextField
                id="outlined-basic"
                value="des"
                // onChange={(e) => setDescription(e.target.value)}
                label="Description"
                type="text"
                variant="outlined"
                fullWidth
                className='paper-inpt-fields'
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ed_issueState}
                  label="Next State"
                // onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={ed_issueState}>{ed_issueState}</MenuItem>
                  <MenuItem value={"QUESTION"}>Question</MenuItem>
                                <MenuItem value={"IMPROVEMENT"}>Improvement</MenuItem>
                </Select>
              </FormControl>
              {/* default state need to set as OPEN */}
              <Stack spacing={2} direction="rtl" style={{ margin: 'auto', direction: 'rtl' }}>
                            <Button variant="contained" color="primary" onClick={handleClick}>Create</Button>
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
