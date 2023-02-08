import * as React from "react";
import Button from "@mui/material/Button";
import FormTable from "./FormTable";
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
  
  const PreviousFormClick = () => {
    axios({
      method: "post",
      url: "http://localhost:4000/userdetails/id",
      data: { emp_num: empNumber }
    
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
  
  const AdditionalInfo = () => {
    setTable(true);
  };

  // console.log(data);
  // console.log(table);
  console.log(empName);

  return (
    <>
      <div className="ButtonFlex">
        <Button
          onClick={() => {
            PreviousFormClick();
          }}
          onDoubleClick={() => {
            setRender(false);
          }}
        >
          Previous Form
        </Button>
      </div>
      <h1>
        {empName}--{empNumber}
      </h1>
      {table ? (
        <FormTable />
      ) : (
        <div>
          {
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="customized table">
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
                  {data.map((row) => {
                    return (
                      <StyledTableRow component="th" scope="row">
                        <StyledTableCell>{row.obj_no}</StyledTableCell>
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
          <Button
            onClick={() => {
              AdditionalInfo();
            }}
            style={{ margin: "auto" }}
          >
            Add
          </Button>
        </div>
      )}
    </>
  );
}

export default AfterLogin;
