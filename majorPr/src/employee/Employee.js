import * as React from "react";
import Box from "@mui/material/Box";
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
import { makeStyles } from "@mui/styles";

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

const useStyles = makeStyles({
  buttonStyle: {
    color: "blue",
  },
  FormTable: {
    width: "40vw",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  dialog: {
    backgroundColor: "#E9F8F9",
  },
  FormTitle: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "600",
  },
});

function AfterLogin({ name }) {
  const classes = useStyles();
  const [render, setRender] = React.useState(false);

  const { empNumber, setEmpNumber, empName, setEmpName } =
    React.useContext(contextData);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [individual, setIndividual] = React.useState("");
  const [performance, setPerformance] = React.useState("");
  const [rating, setRating] = React.useState();
  const localStorageEmpName = localStorage.getItem("EmpName");

  const localStorageEmpNumber = localStorage.getItem("EmpNumber");
  setEmpName(localStorageEmpName);
  setEmpNumber(localStorageEmpNumber);
  console.log(localStorageEmpName, localStorageEmpNumber);
  // console.log(empNumber);
  React.useEffect(() => {}, []);

  const ClearFunction = () => {
    setIndividual("");
    setPerformance("");
    setRating("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseButton = () => {
    setOpen(false);
    ClearFunction();
  };
  const SubmitFunction = async () => {
    try {
      console.log(performance, individual, rating);
      if (individual && performance && rating < 10) {
        await axios({
          method: "Post",
          url: "http://localhost:4000/emp_loginupdate",
          header: "application/json",
          data: {
            emp_num: empNumber,
            indi_obj: individual,
            perfor_obj: performance,
            self_rating: rating,
          },
        });
      } else {
        if ((rating) => 11) {
          alert("rating must be less than 10");
          return;
        }
        alert("Please fill all the fields");
        return;
      }

      // history("/emp_login");
    } catch (err) {
      console.log(err.message);
    }
    ClearFunction();
  };
  

  //for getting the managertable and setting the data
  const PreviousFormClick = async () => {
    console.log("previous form clicked");
    await axios({
      method: "post",
      url: "http://localhost:4000/PreviousFormClick",
      data: { emp_num: empNumber },
    }).then((data) => {
      console.log(data.data);

      setData(data.data);
    });
    setRender(true);
  };
  React.useEffect(() => {
    PreviousFormClick();
  }, [])

  const EditFunc = (indi_obj) => {
    console.log(indi_obj);
    // ClearFunction();
    setIndividual(indi_obj);
    // setPerformance(performance)
    // console.log(individual);
    handleClickOpen();
  };
  const UpdateEmpLogin = async (indi_obj, perfor_obj, self_rating) => {
    console.log(perfor_obj);
    setIndividual(indi_obj);
    setPerformance(perfor_obj);
    setRating(self_rating);
    // await axios({
    //   method: "post",
    //   url: "http://localhost:4000/update_emp_login",
    //   data: {
    //     emp_num: empNumber,
    //     indi_obj: indi_obj,
    //     perfor_obj: perfor_obj,
    //     self_rating: self_rating,
    //   },
    // });
    handleClickOpen();
  };
  const updateExistingData = async () => {
    try {
      if (empNumber && individual && performance && rating) {
        await axios({
          method: "post",
          url: "http://localhost:4000/update_emp_login",
          data: {
            emp_num: empNumber,
            indi_obj: individual,
            perfor_obj: performance,
            self_rating: rating,
          },
        });
      } else {
        alert("performance or self_rating need to be added");
      }
    } catch (error) {
      console.log(error.message);
    }
    PreviousFormClick();
    handleCloseButton();
    console.log("updated data is clicked");
  };
  // console.log(data[0]?.self_rating)
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
      </div>
      <h1>
        {empName}--{empNumber}
      </h1>

      <div>
        {
          <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
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
              <TableBody sx={{ maxWidth: 800 }}>
                {data.map((row, index) => {
                  console.log(row.perfor_obj);
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
                        {row.mgr_rating ? (
                          <Button disabled>Update</Button>
                        ) : row.self_rating ? (
                          <Button
                            onClick={() => {
                              UpdateEmpLogin(
                                row.indi_obj,
                                row.perfor_obj,
                                row.self_rating
                              );
                            }}
                          >
                            Update
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={() => {
                              EditFunc(row.indi_obj);
                            }}
                          >
                            {" "}
                            Edit
                          </Button>
                        )}
                        <Dialog
                          open={open}
                          maxWidth="100px"
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogContent className={classes.dialog}>
                            <DialogTitle
                              id="alert-dialog-title"
                              className={classes.FormTitle}
                            >
                              Employee Info
                            </DialogTitle>
                            <DialogContentText id="alert-dialog-description">
                              <Box>
                                <form className={classes.FormTable}>
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
                                    disabled="true"
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
                                    value={rating}
                                    onChange={(e) => {
                                      setRating(e.target.value);
                                    }}
                                  />
                                </form>
                              </Box>
                              <DialogActions>
                                <Button onClick={handleCloseButton}>
                                  Close
                                </Button>

                                {data[0]?.self_rating ? (
                                  <Button onClick={updateExistingData}>
                                    Update
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {
                                      SubmitFunction();
                                      setOpen(false);
                                    }}
                                    autoFocus
                                  >
                                    submit
                                  </Button>
                                )}
                              </DialogActions>
                            </DialogContentText>
                          </DialogContent>
                        </Dialog>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </div>
    </>
  );
}

export default AfterLogin;
