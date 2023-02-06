import React, { memo } from "react";
import AfterLogin from './AfterLogin'
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emp_num, setEmp_num] =React.useState();

  const history =useNavigate();
  const SubmitFunction = () => {
    try {
      axios({
        method: "post",
        url: "http://localhost:3000/login",
        header:'application/json',
        data:{
          email:email,
          password_:password
        },
        withCredentials: true
      }).then((data)=>{
     return data.data
      }).then((data)=>{
        console.log(data.data[0]?.emp_num)
        setEmp_num(data.data[0]?.emp_num)
        if(data.sucess===true){
          history('/AfterLogin')
        }
        console.log(data.sucess);
      });
    } catch (err) {
      console.log(err.message);
    }
    console.log('Login ')
    setEmail('');
    setPassword('');
  };

  const Input = { padding: "10px" };
  const spacing = { margin: "5px" };

  return (
    <>
      
      {emp_num?<AfterLogin value={emp_num}/>:<Box
        sx={{
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 200,
            height: 280,
            backgroundColor: "lightblue",
            display: "grid",
            borderRadius: "10px 30px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Login Form</h2>

          <div style={Input}>
            <TextField
              id="filled-basic"
              label="email"
              variant="filled"
              style={spacing}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              style={spacing}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button
            style={{ borderRadius: "30px 30px" }}
            onClick={() => {
              SubmitFunction()
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>}
    </>
  );
}
export default memo(Login);
