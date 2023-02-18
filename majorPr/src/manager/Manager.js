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
import TextField from "@mui/material/TextField";
import DefaultManager from "./DefaultManager";
import Behaviour from './Behaviour';


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

  const { empNumber, setEmpNumber, empName, setEmpName } =
    React.useContext(contextData);
  const [managerData, setManagerData] = React.useState([]);
  

  const localStorageEmpName = localStorage.getItem("EmpName");
  const localStorageEmpNumber = localStorage.getItem("EmpNumber");
  setEmpName(localStorageEmpName);
  setEmpNumber(localStorageEmpNumber);
  console.log(localStorageEmpName, localStorageEmpNumber);

  const customTableContainer = {
    overflowX: "initial",
  };
  console.log(empNumber);
  const OnclickRow = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/manager",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      setRender(data.data);
  
    });
  };
  const OpenTable = async (emp_num,first_name) => {
    localStorage.setItem('Labour_id',emp_num)
    localStorage.setItem('Labour_first_name',first_name)
    console.log(emp_num,first_name);
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

  //correct
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
    OnclickRow();
  }, []);

 
  const EmpNameStyle={
    color:'#DEFCF9',
    display: 'flex',
    justifyContent: 'space-around',
    position:'sticky',
    top:'0px',
    backgroundColor:'#362FD9',
    zIndex:5


  }

  return (
    <>
      <h1>Manager {empName}</h1>
      
      {table ? (
        <>
        <div style={EmpNameStyle}
>
        <h2 >{localStorage.getItem('Labour_first_name')}</h2>
        <h2 >{localStorage.getItem('Labour_id')}</h2>
        <Button
              onClick={() => {
                ManagerAdd();
              }}
              style={{color:'#DEFCF9'}}
            >
             Home Page
            </Button>
       
        </div>
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
                        <StyledTableRow component="th" scope="row" key={index}>
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
            
          </div>
          <Behaviour/>
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
                {render.map((row,index) => {
                  return (
                    <HybridStyledTableRow
                      component="th"
                      scope="row"
                      onClick={() => {
                        OpenTable(row.emp_num,row.first_name);
                      }}
                      key={index}
                    >
                      <HybridStyledTableCell >
                        {row.emp_num}
                      </HybridStyledTableCell>
                      <HybridStyledTableCell>
                        {row.first_name}
                      </HybridStyledTableCell>
                    </HybridStyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
      <DefaultManager />
    
        </>
      )}

    </>
  );
}

export default Manager;
