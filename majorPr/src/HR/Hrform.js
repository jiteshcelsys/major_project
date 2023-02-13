import * as React from 'react';
import Button from "@mui/material/Button";
import { contextData } from "../context/contextData";
import { useContext } from 'react';

function Hrform({HrPermission}) {
const {empNumber,setEmpNumber,empName, setEmpNam}=React.useContext(contextData)
console.log(empNumber)

  return (
    <>
    <Button  onClick={()=>{HrPermission(false)}}> allowed </Button>
    <Button  onClick={()=>{HrPermission(true)}}> Not Allowed </Button>
    </>
  )
}

export default Hrform
