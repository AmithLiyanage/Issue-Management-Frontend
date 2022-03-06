import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Plot from "react-plotly.js";
import { getPieData } from "../state/actions";
import { getIssueListData } from "../state/actions";
import { useDispatch, useSelector } from "react-redux";

export default function PieChartFN() {
  const dispatch = useDispatch();
  const submittedBy = useSelector((state => state.authData.email));
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
    getPieData({ submittedBy })(dispatch);
  }, [dispatch]);

  const checkLabels = async (label) => {
    getIssueListData({ label })(dispatch);
  };

  return (
    <Container>
      <div className="paper-arrange-horizontal" style={{ display: "flex" }}>
        <Paper elevation={3} style={paperStyle3}>
          <Plot 
            data={[issuesByState?.pieChartData]}
            layout={{ width: 500, height: 400, title: "Issue Pie Chart" }}
            onClick={async (e) => await checkLabels(e.points[0].label)}//pie chart on click()
          />
          <div style={{ display: "flex"}}>
            <div style={{fontWeight: "bolder"}}>Info : </div>
            <div style={{ color: "gray", marginLeft: "8px" }}> Select Pie chart section before, If want to filter issue list by section</div>
          </div>
        </Paper>
      </div>

    </Container>
  );
}


