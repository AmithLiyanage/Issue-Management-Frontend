import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { Button, Chip, IconButton, ListItem, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

import AddIssueDialog from "./AddIssueDialog";
import HistoryIssueDialog from "./HistoryDialog";
import EditDialog from "./EditDialog";
import { getPieData } from "../state/actions";
import { setIssueListData } from "../state/actions";
// import { tmplabel } from "../state/actions";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from "../state/index";

//const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Issue() {
  const userData = useSelector((state => state.authData.email));
  const initData = useSelector((state => state.data.issueListType));
  const issueListTypeProp = useSelector(({data:{issueListType}})=>issueListType)
  // const IssueList = useSelector((state => state.issueListType));

  // const [issueListType, setType] = useState("");
  
  const IssueList = useState('issueListType');
  const dispatch = useDispatch();
  const {tmplabel} = bindActionCreators(actionCreators, dispatch);

  const AC = bindActionCreators(actionCreators, dispatch);
  console.log(AC)

  console.log(issueListTypeProp);

  const paperStyle = {
    padding: "24px 20px",
    width: "calc(100%-40px)",
    margin: "20px auto",
  };

  //add dialog
  const [addIssueData, setAddIssues] = useState([]);
  const [openedAdd, setAddOpened] = useState(false);
  const [openedHistory, setHistoryOpened] = useState(false);

  //edit/history dialog
  const [issues, setIssues] = useState([]);
  // const [filteredBy, setfilteredBy] = useState(null);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [ed_issueID, setEDIssueID] = useState(null);
  const [ed_issueName, setEDIssueName] = useState(null);
  const [ed_issueState, setEDIssueState] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    fetch("/issue/getAllIssues")
      .then((res) => res.json())
      .then((result) => {
        setIssues(result);
      });
  }, []); //single call

  //filter chips
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  useEffect(() => {
    getPieData()(dispatch);
  }, [dispatch]);

  // useEffect(() => {
  //   setIssueListData()(dispatch);
  // }, [dispatch]);

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'All' },
    { key: 1, label: 'OPEN' },
    { key: 2, label: 'IN_PROGRESS' },
    { key: 3, label: 'WAITING_ON_CLIENT' },
    { key: 4, label: 'RESOLVED' },
  ]);
  const activFiltre = null;

  const deleteFilter = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  
  //issue list filter
  const setLabel = async (label) => {
    console.log("new label : "+label);
    console.log("IssueList : "+IssueList);
    console.log("initData "+initData);
    console.log("userData "+userData);
  };

  const checkLabels = async (label) => {
    console.log("new label "+label);
    let res, response;
    // activFiltre = label;
    switch (label) {
      case "OPEN":
        res = await fetch("/issue/getOpenIssues");
        response = await res.json();
        break;
      case "IN_PROGRESS":
        res = await fetch("/issue/getInProgressIssues");
        response = await res.json();

        break;
      case "WAITING_ON_CLIENT":
        res = await fetch("/issue/getWaitingOnClientIssues");
        response = await res.json();
        break;
      case "RESOLVED":
        res = await fetch("/issue/getResolvedIssues");
        response = await res.json();
        break;
      default:
        res = await fetch("/issue/getAllIssues");
        response = await res.json();
        break;
    }
    console.log("label : " + label);
    console.log(response);
    setFilteredIssues(response);
  };

  //dialogs
  const addIssse = () => {
    //console.log("trying to add")
    setAddOpened(true);
  };

  const historyIssse = (ed_issueID) => {
    //console.log("trying get " + ed_issueID + " history")
    setEDIssueID(ed_issueID);
    setHistoryOpened(true);
  };

  const editIssse = (ed_issueID, ed_issueName, ed_issueState) => {
    setEDIssueID(ed_issueID);
    setEDIssueName(ed_issueName);
    setEDIssueState(ed_issueState);
    setOpened(true);
  };

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
        });
      getPieData()(dispatch);
    });
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <AddIssueDialog
          opened={openedAdd}
          setOpened={setAddOpened}
        />
        <HistoryIssueDialog
          ed_issueID={ed_issueID}
          opened={openedHistory}
          setOpened={setHistoryOpened}
        />
        <EditDialog
          ed_issueID={ed_issueID}
          ed_issueName={ed_issueName}
          ed_issueState={ed_issueState}
          opened={opened}
          setOpened={setOpened}
        />
        <button onClick={() => setIssueListData()}>Check</button>
        <button onClick={async (e) => await setLabel(setIssueListData())}>Check 2</button>
        <button onClick={async (e) => await setLabel(tmplabel())}>Check 3</button>
        <button onClick={async (e) => await checkLabels(tmplabel())}>Check 4</button>
        <div style={{ display: "flex", marginBottom: "16px", width: "100%" }}>
          <div style={{ margin: "0 8px", textAlign: "left", width: "80%" }}>
            <h2 >
              All issues
              <div> {IssueList}</div>
            </h2>
          </div>
          
          <div style={{ margin: "0 8px", textAlign: "right", width: "20%" }}>
            <Button variant="contained" color="primary"
              onClick={() => addIssse()}>
              + Add Issue
            </Button>
          </div>
        </div>
        <Stack direction="row" style={{ textAlign: "left", display: "inline-flex"}} >
              {/* <Chip label="Deletable" variant="outlined" color="primary" onDelete={handleDelete} /> */}
              {chipData.map((data) => {
                return (
                  <ListItem key={data.key}>
                    <Chip
                      label={data.label}
                      color="primary"
                      onDelete={data.label === 'React' ? undefined : deleteFilter(data)}
                    />
                  </ListItem>
                );
              })}
            </Stack>

        {issues.map((issue, index) => (
          <Paper
            elevation={6}
            style={{ margin: "8px", textAlign: "left", display: "flex" }}
            key={index}
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
                  <IconButton aria-label="history"
                    onClick={() =>
                      historyIssse(issue.issueId)
                    }>
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
