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

function Comment() {
  const [open, setOpen] = React.useState(false);
  const [keepDoing, setKeepDoing] = React.useState("");
  const [start, setStart] = React.useState("");
  const [stop, setStop] = React.useState("");
  const [commentArray, setCommentArray] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setKeepDoing("");
    setStart("");
    setStop("");
    setOpen(false);
  };
  const handleCloseSubmit = () => {
    if (submitComment) {
      setKeepDoing("");
      setStart("");
      setStop("");
      setOpen(false);
    }
  };
  // async function fetchComment (){
  //   await axios({
  //     url:'http://localhost:4000/fetchcomment',
  //     method:'Post',
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     data:{
  //       emp_num:localStorage.getItem('Labour_id')
  //     }
  //   }).then((response)=>{
  //     setCommentArray(response.data)
  //     console.log(response.data)
  //   })
  //   return true

  // }

  const submitComment = async () => {
    const EmpNumber = localStorage.getItem("Labour_id");
    console.log(keepDoing);
    console.log(start);
    console.log(stop);

    try {
      if (keepDoing && start && stop) {
        axios({
          method: "Post",
          url: "http://localhost:4000/comment/insert",
          data: {
            emp_num: EmpNumber,
            keepDoing: keepDoing,
            start: start,
            stop: stop,
          }
        }).then((response) => {
          setCommentArray(response.data);
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
      url: "http://localhost:4000/getcomment",
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        emp_num: EmpNumber,
      },
    }).then((response) => {
      setCommentArray(response.data);
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
      <h1>Comment </h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Comment
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
              <StyledTableCell>serial No</StyledTableCell>
              <StyledTableCell align="right">Keep Doing</StyledTableCell>
              <StyledTableCell align="right">Start</StyledTableCell>
              <StyledTableCell align="right">Stop</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxWidth: 800 }}>
            {commentArray.map((row, index) => {
              return (
                <StyledTableRow component="th" scope="row" key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.keep_doing}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.start_}</StyledTableCell>
                  <StyledTableCell align="right">{row.stop}</StyledTableCell>
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
                  Comment Attribute
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={DialogContenteStyle}>
                    <TextField
                      label="Keep Doing"
                      onChange={(e) => {
                        setKeepDoing(e.target.value);
                      }}
                    />
                    <TextField
                      label="Start"
                      onChange={(e) => {
                        setStart(e.target.value);
                      }}
                    />
                    <TextField
                      label="Stop"
                      onChange={(e) => {
                        setStop(e.target.value);
                      }}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={submitComment} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Comment;
