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
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";

export default function FormDialogHistory({
  ed_issueID,
  opened,
  setOpened }) {
  const [open, setOpen] = React.useState(opened);
  const [issueHistory, setIssueHistory] = useState([]);
  var data = [];
  const dispatch = useDispatch();
  const paperStyle = {
    padding: "24px 20px",
    width: "calc(100%-40px)",
    margin: "20px auto",
  };

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("issue/getEventsByIssue/" + ed_issueID)
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setIssueHistory(result);
  //       });
  //     // const data = await res.json()
  //     // const newStatus = data.map(obj => (obj.availableStatus))
  //     // const oldIssue = data.map(obj => (obj.count))
  //     // console.log("from bc : " + newStatus)
  //     // console.log("from bc : " + oldIssue)
  //     // setAvailabeStatus(newStatus)
  //     // setOldIssue(oldIssue)
  //   })();
  //   // console.log("from data" + data)
  //   setOpen(opened);
  // }, [opened]);

  useEffect(() => {
    (async () => {
      if (!ed_issueID) return;
      const res = await fetch("issue/getEventsByIssue/" + ed_issueID);
      const data = await res.json();
      setIssueHistory(data);
    })();

    setOpen(opened);
  }, [ed_issueID, opened]);

  React.useEffect(() => {
    console.log("history "+ed_issueID);
  }, [ed_issueID]);

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>History Issue</DialogTitle>
        <DialogContent>
          <Container>
            <Paper elevation={3} style={paperStyle}>
              <h2 style={{ margin: "0 16px 16px 16px", textAlign: "left" }}>
                All Issues
              </h2>
              {issueHistory.map((issue) => (
                <Paper
                  elevation={6}
                  style={{ margin: "8px", textAlign: "left", display: "flex" }}
                  key={issue.issueId}
                >
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          width: "50%",
                          textAlign: "left",
                          display: "flex",
                          padding: "8px",
                        }}
                      >
                        <div style={{ padding: "inherit" }}>
                          #{issue.issueId}
                        </div>
                        <div style={{ fontWeight: "bold", padding: "inherit" }}>
                          {" "}
                          {issue.issueName}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          direction: "rtl",
                          padding: "8px",
                        }}
                      >
                        <div
                          style={{
                            color: "blueviolet",
                            textAlign: "end",
                            fontWeight: "bold",
                            padding: "inherit",
                          }}
                        >
                          {issue.state}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          width: "50%",
                          textAlign: "left",
                          display: "flex",
                          padding: "0 8px",
                        }}
                      >
                        <div style={{ padding: "inherit" }}>{issue.type}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          width: "60%",
                          textAlign: "left",
                          display: "flex",
                          padding: "0 8px 8px 8px",
                        }}
                      >
                        <div style={{ padding: "inherit" }}>
                          {issue.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              ))}
            </Paper>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
