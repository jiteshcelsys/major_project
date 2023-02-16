import * as React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { contextData } from "../context/contextData";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";

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
const HybridStyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const HybridStyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover td": {
    backgroundColor: "#635985",
    color: "#E9F8F9",
  },
}));

function Manager() {
  const [render, setRender] = React.useState([]);
  const [table, setTable] = React.useState(false);
  const [Input_mgr, setInput_mgr] = React.useState("");
  const [tableData, setTableData] = React.useState([]);
  const [individual, setIndividual] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { empNumber, setEmpNumber, empName, setEmpName } =
    React.useContext(contextData);
  const [managerData, setManagerData] = React.useState([]);
  const [handleIndividual, setHandleIndividual] = React.useState(false)
  const handleCloseIndividual=()=>{
    setHandleIndividual(false)
  }
  const handleClickOpenIndividual=()=>{
    setHandleIndividual(true)
  }
  

  const localStorageEmpName = localStorage.getItem("EmpName");
  const localStorageEmpNumber = localStorage.getItem("EmpNumber");
  setEmpName(localStorageEmpName);
  setEmpNumber(localStorageEmpNumber);
  console.log(localStorageEmpName, localStorageEmpNumber);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const customTableContainer = {
    overflowX: "initial",
  };
  console.log(empNumber);
  const renderData = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/manager",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      console.log(data);
      setRender(data.data);
    });
  };
  const OpenTable = async (emp_num) => {
    await axios({
      method: "Post",
      url: "http://localhost:4000/manager/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        emp_num: emp_num,
      },
    }).then((data) => {
      setTableData(data.data);
      console.log(data.data);
    });
    setTable(true);
    // console.log(emp_num)
  };
  const ManagerAdd = () => {
    setTable(false);
  };
  console.log(tableData);

  const UpdateMgrTable = (emp_num, indi_obj, Input_mgr) => {
    // console.log(emp_num,indi_obj,Input_mgr)

    axios({
      method: "Post",
      url: "http://localhost:4000/manager/update",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        emp_num: emp_num,
        indi_obj: indi_obj,
        mgr_rating: Input_mgr,
      },
    }).then((data) => {
      if (data.data[0]?.mgr_rating < 10) {
        console.log(data.data[0]);
        setInput_mgr(data.data[0]?.mgr_rating);
      } else {
        alert("rating should be less than 10");
      }

      console.log(data.data[0]?.mgr_rating);
    });
  };

  console.log(render);
  console.log(Input_mgr);
  const fetch_managerTable = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/managertable",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      // console.log(data.data);
      setManagerData(data.data);
      // const [managerData,setManagerData] = React.useState([])
      console.log(managerData);
      return;
    });
  };
  React.useEffect(() => {
    fetch_managerTable();
    renderData();
  }, []);

  const InsertIndividual = async () => {
    await axios({
      method: "Post",
      url: "http://localhost:4000/managertable/insert",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        indi_obj: individual,
      },
    }).then((data) => {
      console.log(data.data);
    });
    fetch_managerTable();
    handleCloseIndividual();
  };
  const hoverStyle = {
    "& .MuiOutlinedInput-root:hover": {
      color: "#red",
      // color:"white"
    },
  };

  //  fetch_managerTable();
  return (
    <>
      <h1>Manager {empName}</h1>
      {table ? (
        <>
          <div>
            {
              <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
                <Table
                  sx={{ minWidth: 600 }}
                  aria-label="customized table"
                  stickyHeader
                  style={customTableContainer}
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Objective Number</StyledTableCell>
                      <StyledTableCell align="right">
                        Individual Objective
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Performance Objective
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Self rating
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Manager Rating
                      </StyledTableCell>{" "}
                      <StyledTableCell align="right">Operation</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, index) => {
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
                            <TextField
                              id="outlined-basic"
                              label="Rating"
                              variant="outlined"
                              value={row.mgr_rating}
                              onChange={(e) => {
                                setInput_mgr(e.target.value);
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              onClick={() => {
                                UpdateMgrTable(
                                  row.emp_num,
                                  row.indi_obj,
                                  Input_mgr
                                );
                              }}
                            >
                              update
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            }
            <Button
              onClick={() => {
                ManagerAdd();
              }}
              style={{ margin: "auto" }}
            >
              Back
            </Button>
          </div>

          <h1>Behaviour Attribute</h1>
          <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
            <Table
              sx={{ minWidth: 600 }}
              aria-label="customized table"
              stickyHeader
              style={customTableContainer}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Behaviour Attribute</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">
                    Manager Rating
                  </StyledTableCell>
                  <StyledTableCell align="right">Operation</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <div>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Add Attribute
                  </Button>
                  <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Behaviour Attribute
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <TextField label="Behaviour Attr" />
                        <TextField label="Description" />
                        <TextField label="Manager_Rating/10" />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                      <Button onClick={handleClose} autoFocus>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Manager Form</h1>
          <h3>Submitted Form</h3>

          <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
            <Table
              sx={{ maxidth: 300 }}
              aria-label="customized table"
              style={customTableContainer}
            >
              <TableHead>
                <TableRow>
                  <HybridStyledTableCell>Employee Number</HybridStyledTableCell>
                  <HybridStyledTableCell>Employee Name</HybridStyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {render.map((row) => {
                  return (
                    <HybridStyledTableRow
                      component="th"
                      scope="row"
                      onClick={() => {
                        OpenTable(row.emp_num);
                      }}
                    >
                      <HybridStyledTableCell style={hoverStyle}>
                        {row.emp_num}
                      </HybridStyledTableCell>
                      <HybridStyledTableCell>{row.first_name}</HybridStyledTableCell>
                    </HybridStyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
        <h3>Individual Objective </h3>
        <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
          <Table
            sx={{ minWidth: 600 }}
            aria-label="customized table"
            stickyHeader
            style={customTableContainer}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                Serial No.
                </StyledTableCell>
                <StyledTableCell align="right">
                  First Name
                </StyledTableCell>
                <StyledTableCell align="right">
                Role
                </StyledTableCell>
                <StyledTableCell align="right">
                Assign
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {managerData.map((row, index) => {
               
                return (
                  <StyledTableRow component="th" scope="row">
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.first_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.role_}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button disabled={(row.role_==='Manager'||row.role_==='HR')?true:null} onClick={()=>{
                        console.log(row.first_name)
                      }}>Add</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="outlined" onClick={handleClickOpenIndividual}>
        Add Individual
      </Button>
      <Dialog open={handleIndividual} onClose={handleCloseIndividual}>
        <DialogTitle> Individual Objective</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          <TextField
           autoFocus
           margin="dense"
           id="name"
           label="EMployee Name "
           type="email"
           fullWidth
           variant="standard"
         
         />
          <TextField
           autoFocus
           margin="dense"
           id="name"
           label="Employee Number"
           type="email"
           fullWidth
           variant="standard"
         
         />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Individual "
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setIndividual(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIndividual}>Cancel</Button>
          <Button onClick={InsertIndividual}>SUbmit</Button>
        </DialogActions>
      </Dialog>
        
      </div>
        </>
      )}
      
    </>
  );
}

export default Manager;
