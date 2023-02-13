import * as React from "react";
import FormTable from "./FormTable";
import Box from "@mui/material/Box";

import Hrform from '../HR/Hrform'

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import axios from "axios";
import { contextData } from "../context/contextData";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function AfterLogin({ name }) {
  const [render, setRender] = React.useState(false);
  // const [current, setCurrent] =React.useState(false)
  const { empNumber, setEmpNumber, empName, setEmpName } =
    React.useContext(contextData);
  const [data, setData] = React.useState([]);
  const [table, setTable] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [individual, setIndividual] = React.useState("");
  const [performance, setPerformance] = React.useState("");
  const [rating, setRating] = React.useState();
  const [hrRule, setHrPermission]= React.useState(false)
  // console.log(empNumber);
  const SubmitFunction = () => {
    try {
      if (individual && performance && rating < 10) {
        axios({
          method: "Post",
          url: "http://localhost:4000/emp_login",
          header: "application/json",
          data: {
            emp_num: empNumber,
            indi_obj: individual,
            perfor_obj: performance,
            self_rating: rating,
          },
        });
        alert("data added successfully");
        return true;
      } else {
        if (rating > 10) {
          alert("rating must be less than 10");
          return false;
        }
        alert("Please fill all the fields");
        return false;
      }
      // history("/emp_login");
    } catch (err) {
      console.log(err.message);
    }
    ClearFunction();
  };
  const ClearFunction = () => {
    setIndividual("");
    setPerformance("");
    setRating("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (SubmitFunction()) {
      setOpen(false);
      ClearFunction();
    }
  };
  const handleClose2 = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    PreviousFormClick();
  }, [open]);

  const PreviousFormClick = () => {
    console.log("previous form clicked");
    axios({
      method: "post",
      url: "http://localhost:4000/userdetails/id",
      data: { emp_num: empNumber },
    })
      .then((data) => {
        return data.data.data;
      })
      .then((data) => {
        console.log(data[0]?.mgr_rating);
        setTable(data[0]?.mgr_rating);
        setData(data);
      });
    setRender(true);
  };

  const FormtableFunction = (data) => {
    console.log(data);
  };
   const HrPermission =(data)=>{
    setHrPermission(data)
    console.log(data)
   }
  return (
    <>
      <div className="ButtonFlex">
        <Button
          onClick={() => {
            PreviousFormClick();
          }}
        >
          Previous Form
        </Button>

        <Button
         disabled= {hrRule}
        >
         <Hrform HrPermission ={HrPermission}/>
        </Button>
      </div>
      <h1>
        {empName}--{empNumber}
      </h1>
      {table ? (
        <FormTable FormtableFunction={FormtableFunction} />
      ) : (
        <div>
          {
            <TableContainer component={Paper} sx={{maxHeight:340}}>
              <Table sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Objective No.</StyledTableCell>
                    <StyledTableCell align="right">
                      Individual Objective
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Performance Objective
                    </StyledTableCell>
                    <StyledTableCell align="right">Self rating</StyledTableCell>
                    <StyledTableCell align="right">
                      Manager Rating
                    </StyledTableCell>{" "}
                    <StyledTableCell align="right">Operation</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody  sx={{ maxWidth: 800 }}>
                  {data.map((row, index) => {
                    return (
                      <StyledTableRow component="th" scope="row">
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell align="right">
                          {row.indi_obj}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.perfor_obj}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.self_rating}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.mgr_rating}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button>update</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          }

          <div  style ={{margin:'auto',display:'flex'}}>
            <Button variant="outlined" onClick={handleClickOpen} style ={{margin:'auto',color:'red'}}>
              ADD data
            </Button>
            <Dialog
              open={open}
              maxWidth="100px"
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                style={{ textAlign: "center" }}
              >
                Additional Info
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Box>
                    <form className="FormTable">
                      <TextField
                        id="filled-basic"
                        label="emp_num"
                        value={empNumber}
                        variant="filled"
                      />{" "}
                      <TextField
                        id="filled-basic"
                        label="Individual Objectives"
                        variant="filled"
                        value={individual}
                        onChange={(e) => {
                          setIndividual(e.target.value);
                        }}
                      />{" "}
                      <TextField
                        id="filled-basic"
                        label="Performance Objectives"
                        variant="filled"
                        value={performance}
                        onChange={(e) => {
                          setPerformance(e.target.value);
                        }}
                      />
                      <TextField
                        id="filled-basic"
                        label="Self rating/10"
                        variant="filled"
                        type="number"
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      />
                    </form>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2}>Close</Button>

                <Button onClick={handleClose} autoFocus>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}

export default AfterLogin;
