import axios from 'axios';
import React from 'react';
import  {useState, useEffect} from "react";
import * as FormData from 'form-data'
import "./ComplaintsForm.css" 
 
const ComplaintsForm = (props) => {    
  const [Complaints_info, setComplaints_info] = useState([]);
  const [Machine_components_spr, settMachine_components_spr] = useState([]);
  const [recovery_method_spr, setrecovery_method_spr] = useState([]);
  const [car_spr, setcar_spr] = useState([]);
  const [service_company_spr, setservice_company_spr] = useState([]);

  
  const [id, setid] = useState();
  const [date_of_refusal, setdate_of_refusal] = useState();
  const [operating_time, setoperating_time] = useState();
  const [Machine_components, setMachine_components] = useState();
  const [failure_node, setfailure_node] = useState();
  const [recovery_method, setrecovery_method] = useState();
  const [parts_used, setparts_used] = useState();
  const [date_of_restoration, setdate_of_restoration] = useState();
  const [equipment_downtime, setequipment_downtime] = useState();
  const [car, setcar] = useState();
  const [service_company, setservice_company] = useState();
  
  
  const [groupUser, setgroupUser] = useState('');
  const [mode, setmode] = useState('readOnly');
  const [modecar, setmodecar] = useState('readOnly');
  const [modecompany, setmodecompany] = useState('readOnly');
 
  useEffect(() => {
    async function async_full_car_info() {
        try {            
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Complaints/?id="+props.item);
            setComplaints_info(response.data);
               
                setid(props.item)
                setdate_of_refusal(response.data[0].date_of_refusal)
                setoperating_time(response.data[0].operating_time)
                setMachine_components(response.data[0].Machine_components)
                setfailure_node(response.data[0].failure_node)
                setrecovery_method(response.data[0].recovery_method)
                setparts_used(response.data[0].parts_used)
                setdate_of_restoration(response.data[0].date_of_restoration)
                setequipment_downtime(response.data[0].equipment_downtime)
                setcar(response.data[0].car)                
                setservice_company(response.data[0].service_company)
                
        } catch (error) {
            console.log(error);
        }
    }
    if(props.mode=="edit"){
    async_full_car_info();   }   
},[props.item]);
  
  useEffect(() => {
  const is_authorized = localStorage.getItem('is_authorized')
  setgroupUser(localStorage.getItem('сategory'));
  if(props.mode=="new"){
    editmode()   }

},[]);
  useEffect(() => {
    async function async_Machine_components() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Machine_components/");
            settMachine_components_spr(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async_Machine_components();
},[]);
    useEffect(() => {
    async function async_Recovery_method() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Recovery_method/");
            setrecovery_method_spr(response.data);          
        } catch (error) {
            console.log(error);
        }
    }
    async_Recovery_method();
    
  },[]);
  useEffect(() => {
    const token = localStorage.getItem('Token')
    let сategory="";
    //сategory ="manufacturer" 
     if(localStorage.getItem('сategory')=="Менеджер"){сategory ="manufacturer" }
     if(localStorage.getItem('сategory')=="Сервисная организация"){сategory ="service_company"}
     if(localStorage.getItem('сategory')=="Клиент"){сategory ="client"}
     const company_id = localStorage.getItem('company_id')

    async function async_car() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Full_Car/"+"?type_company="+сategory+"&id_company="+company_id);
            setcar_spr(response.data);     
        } catch (error) {
            console.log(error);
        }
    }
    async_car();
    
  },[]);
  useEffect(() => {
    async function async_service_company() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Service_companyGet/");
            setservice_company_spr(response.data);   
        } catch (error) {
            console.log(error);
        }
    }
    async_service_company();
    
  },[]);
   
   const setClose = () => {  
    props.in_detail()   
  };
  const editmode= () => {
    if(props.formmode=="car"){
      setcar(props.car) 
    setmode("")
    setmodecompany("") 
    }
    if(props.formmode=="full"){
      setmode("")
      setmodecompany("") 
      setmodecar("") 

      }
  }
  const save= () => {
    const token = localStorage.getItem('Token')
    const base_url = "http://127.0.0.1:8000/mysilant/Complaints/"
    
    let data = new FormData();
    data.append('date_of_refusal',date_of_refusal );
    data.append('operating_time',operating_time );
    data.append('Machine_components',Machine_components );
    data.append('failure_node',failure_node );
    data.append('recovery_method',recovery_method );
    data.append('parts_used',parts_used );
    data.append('date_of_restoration',date_of_restoration );
    data.append('equipment_downtime',equipment_downtime );
    data.append('car',car );
    data.append('service_company',service_company );
     
    if(props.mode=="new"){
        axios.post(base_url, data, {
            headers:{'Authorization': 'Token '+token,} 
          }).then((response) => {
              alert("Запись успешно добавлена")
              setClose();
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            alert("Заполнены не все данные")
          });  

    }
    if(props.mode=="edit"){
        data.append('id', id);
        axios.patch(base_url+id+"/", data, {
            headers:{'Authorization': 'Token '+token,} 
          }).then((response) => {
            alert("Запись успешно обновлена")
            setClose();           
          })
          .catch((error) => {
            alert("Ошибка обновления данных")
          });
        
    }



  }
  const deleteid= () => {
    const token = localStorage.getItem('Token')
    const base_url = "http://127.0.0.1:8000/mysilant/Complaints/"  
        axios.delete(base_url+id+"/", {
         headers:{'Authorization': 'Token '+token,} 
        }).then((response) => {
          alert("Запись удалена ");
          setClose();
         })
         .catch((error) => {
         alert("Имеются связанные данные Уданение не возможно ");
  });
};
  

 
   return (
    
    <div className='ComplaintsForm'>      
    <form> 
    <label className='complaintsgroup1'>
      <text>Дата отказа</text>       
      <input type='date' readOnly={mode} defaultValue={date_of_refusal} onChange={e=>setdate_of_refusal(e.target.value)} ></input>
      </label>
      <label className='complaintsgroup2'></label>
      <label className='complaintsgroup3'>
      <text>Наработка м/час</text>       
      <input type='text' readOnly={mode} defaultValue={operating_time} onChange={e=>setoperating_time(e.target.value)} ></input>
      </label>
      <label className='complaintsgroup4'></label>
      <label className='complaintsgroup5'>
      <text>Узел отказа</text>
      <select size="1" disabled ={mode} onChange={e=>setMachine_components(e.target.value)}  >
      {(props.mode=="new")&&
      <option disabled selected value> Выберите Узел отказа</option>}
           
      {Machine_components_spr.map(value =>{         
      return (value.id!=Machine_components)&&(<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
     
 </select>
 </label>
 <label className='complaintsgroup6'></label>
 <label className='complaintsgroup7'>
       <text>Описание отказа </text>  
      <input type='text' readOnly={mode} defaultValue={failure_node} onChange={e=>setfailure_node(e.target.value)} ></input>
      </label>
      <label className='complaintsgroup8'></label>
      <label className='complaintsgroup9'>
      <text>Способ восстановления </text>
      <select size="1" disabled ={mode} onChange={e=>setrecovery_method(e.target.value)}  >
      {(props.mode=="new")&&
      <option disabled selected value>Выберите Способ восстановления </option>}
            
      {recovery_method_spr.map(value =>{         
      return (value.id!=recovery_method)&&(<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>)  
})} 
</select>
</label>
<label className='complaintsgroup10'></label>
<label className='complaintsgroup11'>
    <text>Используемые запасные части </text>       
      <input type='text' readOnly={mode} defaultValue={parts_used} onChange={e=>setparts_used(e.target.value)} ></input>
     </label>
     <label className='complaintsgroup12'></label>
     <label className='complaintsgroup13'>
      <text>Дата восстановления</text>       
      <input type='date' readOnly={mode} defaultValue={date_of_restoration} onChange={e=>setdate_of_restoration(e.target.value)} ></input>
     </label>
     <label className='complaintsgroup14'></label>
     <label className='complaintsgroup15'>
      <text> Время простоя техники</text>       
      <input type='text' readOnly={mode} defaultValue={equipment_downtime} onChange={e=>setequipment_downtime(e.target.value)} ></input>
     </label>
     <label className='complaintsgroup16'></label>
     <label className='complaintsgroup17'>
      <text>Машина</text>
      <select size="1" disabled ={modecar} onChange={e=>setcar(e.target.value)}  >
      {(props.mode=="new"&&props.formmode=="full")&&
      <option disabled selected value> Выберите Машину</option>}              
      {car_spr.map(value =>{         
      return (value.id!=car)&&(<option value={value.id}>{value.factory_number}</option>)||(<option defaultValue={value.id}>{value.factory_number}</option>) 
})}
 </select>
 </label>
 <label className='complaintsgroup18'></label>
 <label className='complaintsgroup19'>
      <text>Сервисная организация</text>
      <select size="1" disabled ={mode} onChange={e=>setservice_company(e.target.value)}  >
      {(props.mode=="new")&&
      <option disabled selected value>Выберите Сервисную организацию </option>}            
      {service_company_spr.map(value =>{         
      return (value.id!=service_company)&& (<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
 </select>
 </label>
     </form>
        <br></br>
        <label className='Button1'>        
        {(mode=="readOnly"&&groupUser!="Клиент")&&
        <button type="button" onClick={editmode}>Редактировать</button>    
        }
        </label>
        <label className='Button2'>
        {(mode!="readOnly"&&groupUser!="Клиент")&&
        <button type="button" onClick={save}>Сохранить</button>    
        }
        {(mode!="readOnly"&&props.mode!="new"&&groupUser!="Клиент")&&
        <button type="button" onClick={deleteid}>Удалить</button>    
        }
        <button type="button" onClick={setClose}>Закрыть</button>
      </label>
      <br></br>
     
      
      </div> 
    
  )
}

export default ComplaintsForm