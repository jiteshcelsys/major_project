import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import axios from "axios";

import TextField from "@mui/material/TextField";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Comment from "./Comment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Behaviour() {
  const [open, setOpen] = React.useState(false);
  const [behaveAttr, setBehaveAttr] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [mgr_rating, setMgrRating] = React.useState("");
  const [fetchbehaviorData, setFetchbehaviorData] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setBehaveAttr("");
    setDescription("");
    setMgrRating("");
    setOpen(false);
  };
  const handleCloseSubmit = () => {
    if (submitBehaviour) {
      setBehaveAttr("");
      setDescription("");
      setMgrRating("");
      setOpen(false);
    }
  };

  const submitBehaviour = async () => {
    const EmpNumber = localStorage.getItem("Labour_id");
    try {
      if (behaveAttr && description && mgr_rating) {
        axios({
          method: "Post",
          url: "http://localhost:4000/emp/addbehave",
          data: {
            emp_num: EmpNumber,
            behaviour_attr: behaveAttr,
            description: description,
            mgr_rating: mgr_rating,
          },
        }).then((data) => {
          console.log(data.data);
          setFetchbehaviorData(data.data);
        });
      } else {
        alert("Please fill all the fields");
        return false;
      }
    } catch (err) {
      console.log(err.message);
    }
    console.log("Submit function is clicked");

    handleCloseSubmit();
  };
  React.useEffect(() => {
    const EmpNumber = localStorage.getItem("Labour_id");
    axios({
      method: "Post",
      url: "http://localhost:4000/getbehave",
      data: {
        emp_num: EmpNumber,
      },
    }).then((data) => {
      setFetchbehaviorData(data.data);
    });
  }, []);

  const customTableContainer = {
    overflowX: "initial",
  };
  const DialogContenteStyle = {
    display: "flex",
    flexDirection: "column",
    marginTop: "2px",
    gap: " 10px",
  };
  const DialogTitleStyle = {
    color: "#472183",
    backgroundColor: "#93BFCF",
  };
  return (
    <div>
      <h1>Behaviour Attribute</h1>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ margin: "auto" }}
      >
        Add Attribute
      </Button>
      <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
        <Table
          sx={{ minWidth: 600 }}
          aria-label="customized table"
          stickyHeader
          style={customTableContainer}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial</StyledTableCell>
              <StyledTableCell align="right">
                Behaviour Attribute
              </StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Manager Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxWidth: 800 }}>
            {fetchbehaviorData.map((row, index) => {
              return (
                <StyledTableRow component="th" scope="row" key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.behaviour_attr}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.mgr_rating}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>

          <TableBody>
            <div>
              <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" style={DialogTitleStyle}>
                  Behaviour Attribute
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={DialogContenteStyle}>
                    <TextField
                      label="Behaviour Attr"
                      onChange={(e) => {
                        setBehaveAttr(e.target.value);
                      }}
                    />
                    <TextField
                      label="Description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <TextField
                      label="Manager_Rating/10"
                      type="number"
                      onChange={(e) => {
                        setMgrRating(e.target.value);
                      }}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={submitBehaviour} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </TableBody>
        </Table>
      </TableContainer>

      <Comment />
    </div>
  );
}

export default Behaviour;
