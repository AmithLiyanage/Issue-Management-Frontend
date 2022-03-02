import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

import "react-toastify/dist/ReactToastify.css";
import EditDialog from "./EditDialog";
import { getPieData } from "../store/actions";
import { useDispatch } from "react-redux";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Issue() {
  const dispatch = useDispatch();
  const paperStyle = {
    padding: "24px 20px",
    width: "calc(100%-40px)",
    margin: "20px auto",
  };
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const [ed_issueID, setEDIssueID] = useState(null);
  const [ed_issueName, setEDIssueName] = useState(null);
  const [ed_issueState, setEDIssueState] = useState(null);
  const [opened, setOpened] = useState(false);

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("issue/getAllIssues")
      .then((res) => res.json())
      .then((result) => {
        setIssues(result);
      });
  }, []); //single call

  const deleteIssue = (deleteId) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/issue/deleteIssue/" + deleteId, requestOptions).then(() => {
      console.log("Issue " + deleteId + " is Deleted");
      fetch("/issue/getAllIssues") //to refresh all issues after delete
        .then((res) => res.json())
        .then((result) => {
          setIssues(result);
          console.log("piechart refreshed");
        });
      getPieData()(dispatch);
    });
  };

  const editIssse = (ed_issueID, ed_issueName, ed_issueState) => {
    setEDIssueID(ed_issueID);
    setEDIssueName(ed_issueName);
    setEDIssueState(ed_issueState);
    setOpened(true);
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <EditDialog
          ed_issueID={ed_issueID}
          ed_issueName={ed_issueName}
          ed_issueState={ed_issueState}
          opened={opened}
          setOpened={setOpened}
        />
        <h2 style={{ margin: "0 16px 16px 16px", textAlign: "left" }}>
          All Issues
        </h2>
        {issues.map((issue) => (
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
                  <div style={{ padding: "inherit" }}>#{issue.issueId}</div>
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
                  <IconButton
                    aria-label="history"
                    style={{ marginRight: "8px" }}
                    onClick={() => deleteIssue(issue.issueId)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <HistoryIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      editIssse(issue.issueId, issue.issueName, issue.state)
                    }
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
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
                  <div style={{ padding: "inherit" }}>{issue.description}</div>
                </div>
              </div>
            </div>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
