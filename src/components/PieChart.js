import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Plot from "react-plotly.js";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import { getPieData } from "../state/actions";
import { getIssueListData } from "../state/actions";
import { useDispatch, useSelector } from "react-redux";

export default function PieChartFN(props) {
  const dispatch = useDispatch();
  const submittedBy = useSelector((state => state.authData.email));
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filteredBy, setfilteredBy] = useState(null);
  const issuesByState = useSelector(({ data }) => data);

  const paperStyle3 = {
    padding: "24px 20px",
    width: "100%",
    margin: "20px 10px 0 0"
  };

  const paperStyle4 = {
    padding: "24px 20px",
    width: "100%",
    margin: "20px 0 0 10px"
  };

  useEffect(() => {
    getPieData({submittedBy})(dispatch);
  }, [dispatch]);

  const checkLabels = async (label) => {
    // setfilteredBy(label)
    // console.log("filteredBy "+filteredBy);
    getIssueListData({label})(dispatch);
    let res, response;
    switch (label) {
      case "OPEN":
        res = await fetch("/issue/getOpenIssues?submittedBy="+submittedBy);
        response = await res.json();
        break;
      case "IN_PROGRESS":
        res = await fetch("/issue/getInProgressIssues?submittedBy="+submittedBy);
        response = await res.json();
        break;
      case "WAITING_ON_CLIENT":
        res = await fetch("/issue/getWaitingOnClientIssues?submittedBy="+submittedBy);
        response = await res.json();
        break;
      case "RESOLVED":
        res = await fetch("/issue/getResolvedIssues?submittedBy="+submittedBy);
        response = await res.json();
        break;
      default:
        res = await fetch("/issue/getAllIssues?submittedBy="+submittedBy);
        response = await res.json();
        break;
    }
    // var count = Object.keys(response).length;
    // noOfIssues = count;
    // console.log(response);
    setFilteredIssues(response);
  };

  return (
    <Container>
      <div className="paper-arrange-horizontal" style={{display: "flex"}}>
      <Paper elevation={3} style={paperStyle3}>
        <Plot
          data={[issuesByState?.pieChartData]}
          layout={{ width: 500, height: 400, title: "Issue Pie Chart" }}
          onClick={async (e) => await checkLabels(e.points[0].label)}//pie chart on click()
        />
      </Paper>

      <Paper elevation={3} style={paperStyle4}>
        <h2 style={{ margin: "0 16px 16px 16px", textAlign: "left" }}>
          Issues :{" "}
        </h2>
        <div id="" style={{ overflow: "scroll", height: "400px" }}>
          {filteredIssues.map((issue) => (
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
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <HistoryIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete">
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
                    <div style={{ padding: "inherit" }}>
                      {issue.description}
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          ))}
        </div>
      </Paper>

      
      </div>
    </Container>
  );
}


