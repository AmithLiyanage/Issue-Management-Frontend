import AppBar from "./Appbar";
import PieChart from "./PieChart";
import AddIssue from "./AddIssue";
import Issue from "./Issue";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";
import { color, fontSize } from "@mui/system";
import HooksIssuesContainer from "./HooksIssuesContainer";

function Home() {
  const authenticated = useSelector(
    ({ authData: { authenticated } }) => authenticated
  );
  return (
    <div className="App">
      <AppBar />
      {authenticated ? (
        <>
          <div className="paper-arrange-horizontal">
            {/* <HooksIssuesContainer/> */}
            <PieChart />
          </div>

          <div id="pieChartContainer" />
          <div className="paper-arrange-horizontal">
            <Issue />
          </div>
        </>
      ) : (
        <Typography><div style={{
          height: "600px",
          transform: "translateY(50%)",
          textAlign: "center",
          fontSize: "24px",
          color: "blue"
        }}>Please Login!</div>
        </Typography>
      )}
    </div>
  );
}

export default Home;
