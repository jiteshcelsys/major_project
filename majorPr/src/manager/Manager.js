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

import TextField from '@mui/material/TextField';





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

function Manager() {
  const [render, setRender] = React.useState([]);
  const [table, setTable] = React.useState(false);
  const [Input_mgr,setInput_mgr]= React.useState("")
  const [tableData, setTableData] = React.useState([]);
  const { empNumber, setEmpNumber, empName, setEmpNam } =
    React.useContext(contextData);
    const customTableContainer={
      overflowX: "initial"
    }
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

  
const UpdateMgrTable=(emp_num,indi_obj,Input_mgr)=>{
  // console.log(emp_num,indi_obj,Input_mgr)

  axios({
    method: "Post",
    url: "http://localhost:4000/manager/update",
    headers: {
      "Content-Type": "application/json",
    },
    data:{
      emp_num:emp_num,
      indi_obj:indi_obj,
      mgr_rating:Input_mgr
      
    }
  }).then((data)=>{
    if(data.data[0]?.mgr_rating<10){
           console.log(data.data[0])
      setInput_mgr(data.data[0]?.mgr_rating)
    }
    else{
      alert('rating should be less than 10')
    }
    
 console.log(data.data[0]?.mgr_rating)
  })
}
  
  console.log(render);
  return (
    <>
      <h1>Manager Table</h1>
      {table ? (
        <div>
          {
            <TableContainer component={Paper} sx={{maxHeight:340}} >
              <Table sx={{ minWidth: 600 }} aria-label="customized table" stickyHeader style={customTableContainer}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Objective Number</StyledTableCell>
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
                <TableBody>
                  {tableData.map((row,index) => {
                    return (
                      <StyledTableRow component="th" scope="row">
                        <StyledTableCell>{index+1}</StyledTableCell>
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
                        <TextField id="outlined-basic" label="Outlined" variant="outlined"value={Input_mgr}  onChange={(e)=>{setInput_mgr(e.target.value)}}/>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button onClick={()=>{
                            UpdateMgrTable(row.emp_num,row.indi_obj,Input_mgr)
                          }}>update</Button>
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
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Manager Form</h1>
          <Button
            type=""
            onClick={() => {
              renderData();
            }}
           style={{ margin: "auto",display:'flex' }}
          >
            Submitted Form{" "}
          </Button>
          <TableContainer component={Paper} sx={{maxHeight:340}}>
              <Table sx={{ maxidth: 300 }} aria-label="customized table" style={customTableContainer}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Employee Number</StyledTableCell>
                    <StyledTableCell>Employee Name</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {render.map((row) => {
                    return (
                      <StyledTableRow component="th" scope="row" onClick={() => {
                        OpenTable(row.emp_num);
                      }}>
                        <StyledTableCell>{row.emp_num}</StyledTableCell> 
                        <StyledTableCell>{row.first_name}</StyledTableCell> 
                       
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          









            {/* {render.map((value, index) => {
              return (
                <>
                  <Button
                    onClick={() => {
                      OpenTable(value.emp_num);
                    }}
                  >
                    {value.first_name}
                  </Button>
                  <h4>{value.indi_obj}</h4>
                  <h4>Self_rating -{value.self_rating}</h4>
                </>
              );
            })} */}
         
          <div></div>
          {/* <h1>{render}</h1> */}
          <p>in this form it update the data and attach tables </p>
        </>
      )}
    </>
  );
}

export default Manager;
