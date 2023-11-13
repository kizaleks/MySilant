import React from "react";
import {Navigate, Route,Routes} from "react-router-dom";
import { useSelector } from "react-redux";
import CommonAccess from "../CommonAccess/CommonAccess";
import References from '../References/References';
import AuthorizationMain from "../Authorization/Authorization";



const Main = () => {
  let is_authorized = localStorage.getItem('is_authorized')
  //let companyInfo = useSelector(state => state.profile.is_authorized)
 // alert("test")
  //alert(is_authorized)
  
  return (
        <Routes>
          is_authorized? (           
          <Route path="/" element={<CommonAccess />}/> 
          <Route path="/references" element={<References/>}/>   
          <Route path="*" element={<Navigate to="/" />} />        
        ):( 
        <Route path="/" element={<CommonAccess />}/> 
        <Route path="/login" element={<AuthorizationMain/>} />       
        <Route path="*" element={<Navigate to="/" />} />)
        </Routes>      
  )
  
}


export default Main