import "./App.css";
import Signup from "./employee/Signup";
import Login from './employee/Login';
import Navbar from './employee/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AfterLogin from './employee/AfterLogin';


function App() {


  return (
    <>
     
      <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path ='/signup' element ={<Signup/>}/>
        <Route path ='/login' element ={<Login/>}/>
        <Route path ='/AfterLogin' element ={<AfterLogin/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
