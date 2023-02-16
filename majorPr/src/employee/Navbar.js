import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Signup from "./Signup";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { contextData } from "../context/contextData";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { empNumber, setEmpNumber, empName, setEmpName } =
    React.useContext(contextData);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useNavigate();
  

  const handleClickOpen = () => {
    history("/");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = () => {
    try {
      axios({
        method: "post",
        url: "http://localhost:4000/login",
        header: "application/json",
        data: {
          email: email,
          password_: password,
        },
      })
        .then((data) => {
          return data.data;
        })
        .then((data) => {
          console.log(data)
          if(data.sucess===false){
            history("/Invalid");
            return
          }
          console.log(data.data[0]?.emp_num)
          localStorage.setItem("EmpName",`${data.data[0]?.first_name}`)
          localStorage.setItem("EmpNumber",`${data.data[0]?.emp_num}`)

          setEmpName(data.data[0]?.first_name);
          console.log(data.data[0]?.first_name);
          // console.log(data.data[0]?.role_)
          if (data.sucess === true) {
            setEmpNumber(data.data[0]?.emp_num);
            console.log(data.data[0]?.role_);
            history(`/${data.data[0]?.role_}`);
          } else {
     
          }
          console.log(data.sucess);
        });
    } catch (err) {
      console.log(err.message);
    

    }
  };
  const SubmitFunction = () => {
    fetchData();
    console.log("Login ");
    setEmail("");
    setPassword("");
    handleClose();
  };

  const spacing = { margin: "5px" };
  const navlink = {
    textDecoration: "none",
    marginLeft: "10px",
    textAlign: "center",
  };
  const LButton = 
    { color: "black", marginLeft: "auto" }


  
  const localStorageEmpName = localStorage.getItem("EmpName"); 
  setEmpName(localStorageEmpName)
  const LogoutFunc=()=>{
    localStorage.removeItem("EmpName");
    localStorage.removeItem("EmpNumber");
    history("/");

  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <h3>Appraisal </h3>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          {empName?<Button onClick={LogoutFunc} style={LButton}>Logout</Button>:<Button
            variant="outlined"
            style={LButton}
            onClick={() => {
              handleClickOpen();
            }}
          >
            Login
          </Button>}
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Login Form</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
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
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>
                  <NavLink to="/Signup" style={navlink}>
                    SignUp
                  </NavLink>
                </Button>
                <Button
                  onClick={() => {
                    SubmitFunction();
                  }}
                  autoFocus
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
