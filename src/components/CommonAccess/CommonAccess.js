import React from 'react';
import  {useState} from "react";
import './CommonAccess.css';

import BaseInfoCar from './BaseInfoCar/BaseInfoCar';
import CompanyInfo from './CompanyInfo/CompanyInfo';
import Maintenance from './Maintenance/Maintenance';
import InfoCar from './InfoCar/InfoCar';
import Complaints from './Complaints/Complaints';
//import "react-tabulator/lib/styles.css"
import "react-tabulator/css/tabulator_midnight.min.css"; // use Theme(s)
import { useNavigate } from "react-router-dom";
const CommonAccess = () => {
  const [widgetname, setWidget] = useState('InfoCar');
  const is_authorized = localStorage.getItem('is_authorized')
  const groupUser = localStorage.getItem('сategory');
  
  const navigate = useNavigate();

  function handleClick() {
   //props.in_detail() 
    navigate("/references");
  }  
  return (
    <main className='CommonAccess'>
      <div >  
      <div >
          {(is_authorized)&&
         <CompanyInfo/>        } 
      </div>
    <br></br>
      
      <div className='CommonAccess'>  
      {(is_authorized)&&
          <label> <input onChange={e=>setWidget("InfoCar")} type="radio" name="Radio" value="InfoCar" defaultChecked={true} /> Информация по машинам </label>
  }
  {(is_authorized)&&<br></br> }
  {(is_authorized)&&
          <label><input onChange={e=>setWidget("Maintenance")} type="radio" name="Radio" value="Maintenance " /> Информация по ТО </label>  
         }
         {(is_authorized)&&       <br></br>}
         {(is_authorized)&&
            <label><input onChange={e=>setWidget("Complaints")} type="radio" name="Radio" value="Complaints " /> Информация по рекламациям </label>                                                          
              }     
              {(is_authorized)&&<br></br>}
              
              {(is_authorized)&&<br></br>}
          </div> 
          <br></br>      
          {(is_authorized)&&
            <button className='accountPanel__button' type="button" onClick={handleClick}> Справочники</button>} 
      {(!is_authorized)&&
         <BaseInfoCar />           
  }
        
        {(is_authorized&&widgetname==="InfoCar")&&
        <InfoCar/>          
  }
        {(is_authorized&&widgetname==="Maintenance")&&
         <Maintenance formmode="full"/> 
  }
        {(is_authorized&&widgetname==="Complaints")&&
        <Complaints formmode="full"/>          
  }        
      </div> 
    </main>
  )
}

export default CommonAccess
