import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { ReactTabulator, reactFormatter,useRowSelect } from "react-tabulator";
import "./BaseInfoCar.css" 
//import "react-tabulator/css/tabulator.min.css";

const editableColumns = [  {
    title: "Заводской номер",
    field: "factory_number",
    width: 180,
    frozen:true,
  
  },
  {
    title: "Модель техники",
    field: "technique_model",
    width: 180,
  },
  {
    title: "Модель двигателя",
    field: "engine_model",
    width: 180,
      
  },
  {
    title: "N двигателя",
    field: "engine_number",
    width: 180,
      
  },
  {
    title: "Модель трансмисии",
    field: "transmission_model",
    width: 180,
      
  },
  {
    title: "N трансмиссии",
    field: "transmission_number",
    width: 180,    
  },
  {
    title: "Модель ведущего моста",
    field: "drive_axle_model",
    width: 250,
       
  },
  {
    title: "N ведущего моста",
    field: "drive_axle_number",
    width: 180,
      
  },
  {
    title: "Модель управляемого моста",
    field: "steerable_axle_model",
    width: 250,
  },
  {
    title: "N управляемого моста",
    field: "steerable_axle_number",
    width: 250,    
  },

];

const options = {
  rowSelection: {
    mode: 'highlight',
    
    onChange: (data) => setlines(1),
  },
  height:"68px",
};

const BaseInfoCar = () => {
  const [InfoCar, setInfoCar] = useState('');
  const [isLoading, setLoading] = useState('');
  
  const search = () => {  
       
    axios.get(`http://127.0.0.1:8000/mysilant/Base_Car/?factory_number=${InfoCar}`).then(res => {
        
        setLoading(res.data);                              
          }).catch(function (error) {
           
          })
      };
const accountInfo = localStorage.getItem('is_authorized')

return (
    <div className='BaseInfoCar'>
      <h1 className='BaseInfoCar'>      
        Найти информацию по машине
             </h1> 
      <input type="text" name="BaseInfoCar" onChange={e=>setInfoCar(e.target.value)}/> 
      <button onClick={search}>Найти</button>  
    <br></br>
      
    <div>
    <h3>Базовая информация по машине</h3>
    <label className='TableBaseInfoCar'>
<ReactTabulator      
          columns={editableColumns}
          data={isLoading} 
          options={options}          
        />
       
    </label>
    
    </div>
    </div>
    
  );
       


}

export default BaseInfoCar

