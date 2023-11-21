import axios from 'axios';
import React from 'react';
import  {useState, useEffect} from "react";
import * as FormData from 'form-data'
import "./MaintenanceForm.css" 

const MaintenanceForm = (props) => {    
  const [Maintenance_info, setMaintenance_info] = useState([]);
  const [car_spr, setcar_spr] = useState([]);
  const [service_company_spr, setservice_company_spr] = useState([]);
  const [type_maintenance_spr, settype_maintenance_spr] = useState([]);
  
  
  const [id, setid] = useState();
  const [car, setcar] = useState();
  const [service_company, setservice_company] = useState();
  const [type_maintenance, settype_maintenance] = useState();
  const [maintenance_date, setmaintenance_date] = useState();
  const [operating_time, setoperating_time] = useState();
  const [order, setorder] = useState();
  const [order_date, setorder_date] = useState();
  const [company_executor, setcompany_executor] = useState();
 
  const [groupUser, setgroupUser] = useState('');
  const [mode, setmode] = useState('readOnly');
  const [modecar, setmodecar] = useState('readOnly');
  const [modecompany, setmodecompany] = useState('readOnly');
 
  useEffect(() => {
    async function async_Maintenance_info() {
        try {            
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Maintenance/?id="+props.item);
            setMaintenance_info(response.data);               
                setid(props.item)
                setcar(response.data[0].car)                
                setservice_company(response.data[0].service_company)
                settype_maintenance(response.data[0].type_maintenance)
                setmaintenance_date(response.data[0].maintenance_date)
                setoperating_time(response.data[0].operating_time)
                setorder(response.data[0].order)
                setorder_date(response.data[0].order_date)
                setcompany_executor(response.data[0].company_executor)
        } catch (error) {
            console.log(error);
        }
    }
    if(props.mode=="edit"){
      async_Maintenance_info();   }   
},[props.item]);
  
  useEffect(() => {
  const is_authorized = localStorage.getItem('is_authorized')
  setgroupUser(localStorage.getItem('сategory'));
  if(props.mode=="new"){
    editmode()   }

},[]);
  useEffect(() => {
    async function async_Type_maintenance() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Type_maintenance/");
            settype_maintenance_spr(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async_Type_maintenance();
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
    const сategory = localStorage.getItem('сategory')
    const company_id = localStorage.getItem('company_id')    
    if(localStorage.getItem('сategory')=="Менеджер"){setmodecompany("") }
    if(localStorage.getItem('сategory')=="Сервисная организация"){
      setmodecompany("")
    }
    if(localStorage.getItem('сategory')=="Клиент"){setmodecompany("") }
    if(props.formmode=="car"){
      setcar(props.car) 
    setmode("")
    }
    if(props.formmode=="full"){
      setmode("")
      setmodecar("") 

      }
    
  }
  const save= () => {
    const token = localStorage.getItem('Token')
    const base_url = "http://127.0.0.1:8000/mysilant/Maintenance/"
    
    let data = new FormData();
    data.append('car',car );
    data.append('service_company',service_company );
    data.append('type_maintenance',type_maintenance );
    data.append('maintenance_date',maintenance_date );
    data.append('operating_time', operating_time);
    data.append('order', order);
    data.append('order_date', order_date);
    data.append('company_executor',company_executor );    
     
    if(props.mode=="new"){     
        axios.post(base_url, data, {
            headers:{'Authorization': 'Token '+token,} 
          }).then((response) => {
              alert("Запись успешно добавлена")
              setClose()
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
    const base_url = "http://127.0.0.1:8000/mysilant/Maintenance/"  
        axios.delete(base_url+id+"/", {
         headers:{'Authorization': 'Token '+token,} 
        }).then((response) => {
          alert("Запись удалена ");
          setClose();
         console.log(JSON.stringify(response.data));
         })
         .catch((error) => {
         alert("Имеются связанные данные Уданение не возможно ");
  });
};
//return (value.id!=service_company)&& (<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>)
   return (     
    
      <div className='MaintenanceForm'>    
      <form>
      <label className='group1'>
      <text >Машина</text>
       
        <select size="1" disabled ={modecar} onChange={e=>setcar(e.target.value)}  >
        {(props.mode=="new"&&props.formmode=="full")&&
        <option disabled selected value>Выберите Машину </option>}             
        {car_spr.map(value =>{         
        return (value.id!=car)&&(<option value={value.id}>{value.factory_number}</option>)||(<option defaultValue={value.id}>{value.factory_number}</option>) 
})}
   </select>
   </label> 
   <label className='group2'></label> 
   <label className='group3'>
        <text>Сервисная организация</text>
        <select size="1" disabled ={modecompany} onChange={e=>setservice_company(e.target.value)}  >
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Сервисную организацию </option>}             
        {service_company_spr.map(value =>{         
        return (value.id!=service_company)&& (<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
   </select>
   </label> 
   <label className='group4'></label> 
   <label className='group5'>
        <text>Вид ТО</text>
        <select size="1" disabled ={mode} onChange={e=>settype_maintenance(e.target.value)}  >
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Вид ТО</option>}               
        {type_maintenance_spr.map(value =>{         
        return (value.id!=type_maintenance)&&(<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}</select>
</label> 
<label className='group6'></label>
<label className='group7'>  
        <text>Дата проведения ТО</text>       
        <input type='date' readOnly={mode} defaultValue={maintenance_date} onChange={e=>setmaintenance_date(e.target.value)} ></input>
        </label>
        <label className='group8'></label> 
        <label className='group9'>
        <text>Наработка м/час</text>       
        <input type='text' readOnly={mode} defaultValue={operating_time} onChange={e=>setoperating_time(e.target.value)} ></input>
        </label> 
        <label className='group10'></label>
        <label className='group11'> 
        <text>Номер заказа-наряда </text>       
        <input type='text' readOnly={mode} defaultValue={order} onChange={e=>setorder(e.target.value)} ></input>
        </label> 
        <label className='group12'></label> 
        <label className='group13'>
        <text>Дата заказа-наряда</text>       
        <input type='date' readOnly={mode} defaultValue={order_date} onChange={e=>setorder_date(e.target.value)} ></input>
       </label> 
       <label className='group14'></label> 
       <label className='group15'> 
        <text>Компания исполнитель</text>       
        <input type='text' readOnly={mode} defaultValue={company_executor} onChange={e=>setcompany_executor(e.target.value)} ></input>
</label>
    </form>
        <br></br>
        <label className='Button1'>
        {(mode=="readOnly")&&
        <button type="button" onClick={editmode}>Редактировать</button>    
        }
        </label>
        <label className='Button2'>
        {(mode!="readOnly")&&
        <button type="button" onClick={save}>Сохранить</button>    
        }
        {(mode!="readOnly"&&props.mode!="new")&&
        <button type="button" onClick={deleteid}>Удалить</button>    
        }
        <button type="button" onClick={setClose}>Закрыть</button>
     </label>
      <br></br>
    
      </div>  
   
  )
}

export default MaintenanceForm