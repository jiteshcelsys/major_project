import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [open, setOpen] = React.useState(false);
  const [managerData, setManagerData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [individual, setIndividual] = React.useState("");

  const fetch_managerTable = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/managertable",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      setManagerData(data.data);

      console.log(managerData);
      return;
    });
  };
  React.useEffect(() => {
    fetch_managerTable();
  }, []);
  const handleClose = () => {
    setOpen(false);
    setIndividual('');
    setNumber('');
    setName('')
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const submitIndividual=()=>{
     axios({
      method: "post",
      url: "http://localhost:4000/InsertIndividual",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        first_name: name,
        emp_num: number,
        indi_obj:individual
      },
    });
    handleClose();

    
  }
  const InsertIndividual = (number, name) => {
    setName(name);
    setNumber(number);
    handleClickOpen();
   
  };
  const clearFunction = () => {
    setName("");
    setNumber("");
  };

  const customTableContainer = {
    overflowX: "initial",
  };

  return (
    <>
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
              <StyledTableCell>Serial No.</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Operation</StyledTableCell>
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
                  <StyledTableCell align="right">{row.role_}</StyledTableCell>
                  <StyledTableCell align="right">
                    {/* <Button  disabled={(row.role_==='Manager'||row.role_==='HR')?true:null} >
                    Add </Button> */}
                    <Button variant="outlined"   disabled={(row.role_==='Manager'||row.role_==='HR')?true:null}onClick={()=>{InsertIndividual(row.emp_num,row.first_name)}}>
                      Add 
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle> Individual Objective</DialogTitle>
                      <DialogContent>
                        <DialogContentText></DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          value={name}
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
                          type="number"
                          value={number}
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
                          onChange={(e)=>{setIndividual(e.target.value)}}
                          variant="standard"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={submitIndividual}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DefaultManager;
