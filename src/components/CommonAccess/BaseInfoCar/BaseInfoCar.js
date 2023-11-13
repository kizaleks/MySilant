import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { ReactTabulator, reactFormatter,useRowSelect } from "react-tabulator";
import "./BaseInfoCar.css" 

const editableColumns = [  {
    title: "Заводской номер",
    field: "factory_number",
    width: 150,
    frozen:true,
  
  },
  {
    title: "Модель техники",
    field: "technique_model",
    width: 150,
  },
  {
    title: "Модель двигателя",
    field: "engine_model",
    width: 150,
      
  },
  {
    title: "Номер двигателя",
    field: "engine_number",
    width: 150,
      
  },
  {
    title: "Модель трансмисии",
    field: "transmission_model",
    width: 150,
      
  },
  {
    title: "Номер трансмиссии",
    field: "transmission_number",
    width: 150,    
  },
  {
    title: "Модель ведущего моста",
    field: "drive_axle_model",
    width: 150,
       
  },
  {
    title: "Номер ведущего моста",
    field: "drive_axle_number",
    width: 150,
      
  },
  {
    title: "Модель управляемого моста",
    field: "steerable_axle_model",
    width: 150,
  },
  {
    title: "Номер управляемого моста",
    field: "steerable_axle_number",
    width: 150,    
  },

];

const options = {
  rowSelection: {
    mode: 'highlight',
    onChange: (data) => setlines(1),
  },
  height:"311px",
};

const BaseInfoCar = () => {
  const [InfoCar, setInfoCar] = useState('');
  const [isLoading, setLoading] = useState('');
  const [isfind, setfind] = useState('');

  const search = () => {  
    axios.get(`http://127.0.0.1:8000/mysilant/Base_Car/?factory_number=${InfoCar}`).then(res => {
        
        setLoading(res.data);                        
        setfind("Найдена информация")
                 
          }).catch(function (error) {
            setfind("Информация не найдена")
          })
      };
const accountInfo = localStorage.getItem('is_authorized')

return (
    <div className='BaseInfoCar'>
      <h1 className='BaseInfoCar__title'>      
        Найти информацию по машине
             </h1> 
      <input type="text" name="myCity" onChange={e=>setInfoCar(e.target.value)}/> 
      <button onClick={search}>Найти</button>  
    <br></br>
      {isfind}
    <div>
    <h3>Базовая информация по машине</h3>
    <ReactTabulator      
          columns={editableColumns}
          data={isLoading} 
          options={options}
          
          
                                
         
        />
       
    </div>
    </div>
    
  );
       


}

export default BaseInfoCar

