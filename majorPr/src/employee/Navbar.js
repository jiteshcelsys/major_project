import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Signup from "./Signup";
import Login from "./Login";
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const ButtonStyle = {
    display: "flex",
    marginLeft: "auto",
  };
  const navlink={
    textDecoration:'none',
    padding:'10px'
  }

  console.log("hi");
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
          <div style={ButtonStyle}>
            <NavLink to='/signup' style={navlink}>SignUp</NavLink>
            <NavLink to='/login' style={navlink}>Login </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
