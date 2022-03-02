import AppBar from "./Appbar";
import PieChart from "./PieChart";
import AddIssue from "./AddIssue";
import Issue from "./Issue";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

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
            <PieChart />
          </div>

          <div id="pieChartContainer" />
          <div className="paper-arrange-horizontal">
            {/* <AddIssue /> */}
            <Issue />
          </div>
        </>
      ) : (
        <Typography>Please Login!</Typography>
      )}
    </div>
  );
}

export default Home;
