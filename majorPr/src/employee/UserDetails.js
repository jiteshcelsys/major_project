import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

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

export default function CustomizedDialogs() {
  const history = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [emp_num, setEmp_num] = React.useState();
  const [first_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClose = () => {
    // console.log(role);
    setOpen(false);
  };

  const SubmitFunction = () => {
    try {
      console.log("setted");
      console.log(emp_num);
      if (emp_num && first_name && last_name && email && role && password) {
        axios({
          method: "Post",
          url: "http://localhost:4000/userDetails",
          header: "application/json",
          data: {
            emp_num: emp_num,
            role_: role,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password_: password,
          },
        }).then(() => {
          console.log("server is running");
        });
      } else {
        alert("Please fill all the fields");
        return
      }
    } catch (error) {}
    setEmp_num(null);
    setRole("");
    setFirst_name("");
    setEmail("");
    setLast_name("");
    setPassword("");

    handleClose();
    history("/");
  };

  const handleRole = (event) => {
    console.log(event.target.value);
    setRole(event.target.value);
  };
  const Role = {
    width: 220,
    margin: "auto",
    paddingTop: "10px",
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 330,
          height: 530,
          backgroundColor: "lightblue",
          display: "grid",
          alignItems: "center",
          borderRadius: "10px 30px",
          textAlign: "center",
        }}
      >
        <form>
          <div className="SignupForm">
            <h2 style={{ textAlign: "center" }}>Sign Up Form</h2>
            <TextField
              style={Role}
              id="filled-basic"
              label="Employee Number"
              variant="filled"
              type="number"
              value={emp_num}
              onChange={(e) => {
                setEmp_num(e.target.value);
              }}
            />
            <TextField
              style={Role}
              id="filled-basic"
              label="First Name"
              variant="filled"
              value={first_name}
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
            />
            <TextField
              style={Role}
              id="filled-basic"
              label="LastName"
              variant="filled"
              value={last_name}
              onChange={(e) => {
                setLast_name(e.target.value);
              }}
            />

            <Box sx={Role}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleRole}
                >
                  <MenuItem value={"HR"}>HR</MenuItem>
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Employee"}>Employee</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              style={Role}
              id="filled-basic"
              label="email"
              variant="filled"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              style={Role}
              id="filled-basic"
              label="Password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <Button onClick={SubmitFunction}>Submit</Button>
      </Box>
    </Box>
  );
}
