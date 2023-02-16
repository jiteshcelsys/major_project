import "./App.css";
import React from 'react'
import Signup from "./employee/Signup";
import Navbar from "./employee/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./employee/Employee";
import {contextData} from "./context/contextData";
import Manager from "./manager/Manager"
import HR from "./HR/Hrform";
import Invalid from "./employee/Invalid";
function App() {
  const [empNumber, setEmpNumber] = React.useState()
  const [empName, setEmpName] = React.useState();
  const [manager, setManager] = React.useState();
  return (
    <>
      <contextData.Provider value={{empNumber, setEmpNumber,empName, setEmpName,manager, setManager}}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/Employee" element={<Employee />} />
            <Route path="/Manager" element={<Manager />} />   
             <Route path="/HR" element={<HR />} />
             <Route path="/Invalid" element={<Invalid />} />
          
             
          </Routes>
        </BrowserRouter>
      </contextData.Provider>
    </>
  );
}

export default App;
