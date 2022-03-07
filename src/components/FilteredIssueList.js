import React, { useState } from 'react'
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

import AddIssueDialog from "./AddIssueDialog";
import HistoryIssueDialog from "./HistoryDialog";
import EditDialog from "./EditDialog";
import { useSelector, useDispatch } from "react-redux";
import { unstable_HistoryRouter } from 'react-router-dom';

function FilteredIssueList() {

    let history = unstable_HistoryRouter();

    const submittedBy = useSelector((state => state.authData.email));
    const filterTypeData = useSelector((state => state.data.issueListType));

    //add dialog
    const [openedAdd, setAddOpened] = useState(false);
    const [openedHistory, setHistoryOpened] = useState(false);

    //edit dialog
    const [issues, setIssues] = useState([]);
    const [ed_issueID, setEDIssueID] = useState(null);
    const [opened, setOpened] = useState(false);

    const paperStyle = {
        padding: "24px 20px",
        width: "calc(100%-40px)",
        margin: "20px auto",
    };

    //dialogs
    const addIssse = () => {
        setAddOpened(true);
    };

    const historyIssue = (ed_issueID) => {
        setEDIssueID(ed_issueID);
        setHistoryOpened(true);
    };

    const editIssue = (ed_issueID) => {
        setEDIssueID(ed_issueID);
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
        });
    };

    const checkLabels = async (label) => {
        let res, result;
        switch (label) {
            case "OPEN":
                res = await fetch("/issue/getOpenIssues?submittedBy=" + submittedBy);
                result = await res.json();
                break;
            case "IN_PROGRESS":
                res = await fetch("/issue/getInProgressIssues?submittedBy=" + submittedBy);
                result = await res.json();
                break;
            case "WAITING_ON_CLIENT":
                res = await fetch("/issue/getWaitingOnClientIssues?submittedBy=" + submittedBy);
                result = await res.json();
                break;
            case "RESOLVED":
                res = await fetch("/issue/getResolvedIssues?submittedBy=" + submittedBy);
                result = await res.json();
                break;
            default:
                res = await fetch("/issue/getAllIssues?submittedBy=" + submittedBy);
                result = await res.json();
                break;
        }
        // console.log(result);
        setIssues(result);
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
                    opened={opened}
                    setOpened={setOpened}
                />

                <div style={{ display: "flex", marginBottom: "24px", width: "100%" }}>
                    <div style={{ margin: "0 8px", textAlign: "left", width: "80%", display: "inline-flex" }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>All Issues : </div>
                        <Button variant="outlined" color="primary" style={{ marginLeft: "16px" }}
                            onClick={async (e) => await checkLabels("ALL")} >
                            Reset
                        </Button>
                        <Button variant="outlined" color="primary" style={{ marginLeft: "16px" }}
                            onClick={async (e) => await checkLabels(filterTypeData)}>
                            Filter by : {filterTypeData}
                        </Button>
                    </div>

                    <div style={{ margin: "0 8px", textAlign: "right", width: "20%" }}>
                        <Button variant="contained" color="primary"
                            onClick={() => addIssse()}>
                            + Add Issue
                        </Button>
                    </div>
                </div>

                {issues.map((issue, index) => (
                    <Paper
                        elevation={6}
                        style={{ margin: "8px", textAlign: "left", display: "flex" }}
                        key={index}
                    >
                        <div style={{ width: "100%" }}>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", textAlign: "left", display: "flex", padding: "8px" }} >
                                    <div style={{ padding: "inherit" }}>#{issue.issueId}</div>
                                    <div style={{ fontWeight: "bold", padding: "inherit" }}>
                                        {" "}{issue.issueName}
                                    </div>
                                </div>
                                <div style={{ width: "50%", display: "flex", direction: "rtl", padding: "8px" }}>
                                    <IconButton aria-label="history" style={{ marginRight: "8px" }}
                                        onClick={() => deleteIssue(issue.issueId)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton aria-label="history"
                                        onClick={() => historyIssue(issue.issueId)}>
                                        <HistoryIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => editIssue(issue.issueId, issue.issueName, issue.state)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <div style={{ color: "blueviolet", textAlign: "end", fontWeight: "bold", padding: "inherit" }} >
                                        {issue.state}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "50%", textAlign: "left", display: "flex", padding: "0 8px" }}>
                                    <div style={{ padding: "inherit" }}>{issue.type}</div>
                                </div>
                                <div style={{ width: "50%", color: "gray", direction: "rtl", display: "flex", padding: "0 24px" }}>{issue.submittedBy}</div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ idth: "60%", textAlign: "left", display: "flex", padding: "0 8px 8px 8px" }}>
                                    <div style={{ padding: "inherit" }}>{issue.description}</div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                ))}
            </Paper>
        </Container>
    )
}

export default FilteredIssueList;
