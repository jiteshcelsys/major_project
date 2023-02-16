import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const HybridStyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
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

function DefaultManager() {

    const [handleIndividual, setHandleIndividual] = React.useState(false);
    const [render, setRender]= React.useState([]);
    const renderData =()=>{
      axios({
        method: "GET",
        url: "http://localhost:4000/manageRender",
        headers: {
          "Content-Type": "application/json",
        },
        data:{

        }

      })
    }


    const customTableContainer = {
    overflowX: "initial",
  };
  return (
    
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
                    <Button >Add</Button>
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
      </>
    
  )
}

export default DefaultManager
