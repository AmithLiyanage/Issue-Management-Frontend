import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function FormDialogHistory({ ed_issueID, opened, setOpened }) {
  const [open, setOpen] = React.useState(opened);
  const [issueHistory, setIssueHistory] = useState([]);
  var data = [];

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
    // console.log("history " + ed_issueID);
  }, [ed_issueID]);

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <div className="dialog-table">
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
        <DialogTitle>Issue History of #{ed_issueID}</DialogTitle>
        <DialogContent >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Events ID</TableCell>
                  <TableCell align="right">Event Time</TableCell>
                  <TableCell align="right">From State</TableCell>
                  <TableCell align="right">To State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {issueHistory.map((event) => (
                  <TableRow
                    key={event.eventId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {event.eventId}
                    </TableCell>
                    <TableCell align="right">{event.eventTime}</TableCell>
                    <TableCell align="right">{event.fromState}</TableCell>
                    <TableCell align="right">{event.toState}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
