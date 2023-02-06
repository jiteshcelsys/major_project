import React from 'react'
import Button from "@mui/material/Button";
import FormTable from './FormTable'


function AfterLogin({value}) {
  console.log(value)
  const [render, setRender] =React.useState(false)
  const [current, setCurrent] =React.useState(false)
  const PreviousFormClick =(data_obj)=>{
    setRender(true);

  }
  return (
   <>
<div className='ButtonFlex'>
<Button onClick={()=>{ PreviousFormClick()}} onDoubleClick={()=>{setRender(false)}}>Previous Form</Button>
{/*    
   <Button onClick={()=>{setCurrent(true)}}
   onDoubleClick={()=>{setCurrent(false)}}>Current Form</Button> */}
</div>
{(render||current)?<FormTable/>:null}
   
   </> 
   
  )
}

export default AfterLogin
