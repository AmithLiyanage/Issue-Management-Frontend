import AppBar from "./Appbar";
import PieChart from "./PieChart";
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
