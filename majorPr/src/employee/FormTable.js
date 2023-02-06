import React, { memo } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function FormTable() {
  const history = useNavigate();
 
  const [emp_num, setEmp_num] = React.useState();
  const [objective_no, setObjective_no] = React.useState();
  const [individual, setIndividual] = React.useState("");
  const [performance, setPerformance] = React.useState("");
  const [rating, setRating] = React.useState("");
  const SubmitFunction =()=>{
    try {
      axios({
        method:'Post',
        url:"http://localhost:3000/data_emp",
        header:'application/json',
        data:{
          emp_num:emp_num,
          obj_no:objective_no, 
          indi_obj:individual,
          perfor_obj:performance,
          self_rating:rating

        }
      })
      history('/emp_login');
      
    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <>
     <Box>
      <form className='FormTable'>

     <TextField
              id="filled-basic"
              label="emp_num"
              value={emp_num}
              variant="filled"onChange={(e)=>{
                setEmp_num(e.target.value)
              }}
              
            />  <TextField
            id="filled-basic"
            label="objective no."
            variant="filled"
            value = {objective_no}
            onChange={(e)=>{
              setObjective_no(e.target.value)
            }}
            
          />  <TextField
          id="filled-basic"
          label="Individual Objectives"
          variant="filled"
          value={individual}
          onChange={(e)=>{setIndividual(e.target.value)}}
          
        />  <TextField
        id="filled-basic"
        label="Performance Objectives"
        variant="filled"
        value ={performance}
        onChange={(e)=>{setPerformance(e.target.value)}}
        
      />
            <TextField
              id="filled-basic"
              label="Self rating"
              variant="filled"
              value={rating}
              onChange={(e)=>{
                setRating(e.target.value)
              }}
              
            />
     
      

<div className='ButtonFlex'>
<Button>Clear</Button>
<Button onClick= {()=>{SubmitFunction()}}>Submit</Button>
</div>
      </form>


      </Box>
     


   
    </>
  )
}

export default FormTable
