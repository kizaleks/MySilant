import axios from 'axios';
import React from 'react';
import  {useState, useEffect} from "react";
import * as FormData from 'form-data'
import "./FullDateForm.css" 

const FullDateForm = (props) => {    
  const [full_car_info, setfull_car_info] = useState([]);
  const [technique_model_spr, settechnique_model_spr] = useState([]);
  const [engine_model_spr, setengine_model_spr] = useState([]);
  const [transmission_model_spr, settransmission_model_spr] = useState([]);
  const [drive_axle_model_spr, setdrive_axle_model_spr] = useState([]);
  const [steerable_axle_modele_spr, setsteerable_axle_model_spr] = useState([]);
  const [Counterparty_spr, setCounterparty_spr] = useState([]);
  const [service_company_spr, setservice_company_spr] = useState([]);
  
  const [id, setid] = useState('');
  const [factory_number, setfactory_number] = useState();
  const [technique_model, settechnique_model] = useState('');
  const [engine_model, setengine_model] = useState('');
  const [engine_number, setengine_number] = useState();
  const [transmission_model, settransmission_model] = useState('');
  const [transmission_number, settransmission_number] = useState();
  const [drive_axle_model, setdrive_axle_model] = useState('');
  const [drive_axle_number, setdrive_axle_number] = useState();
  const [steerable_axle_modele, setsteerable_axle_model] = useState('');
  const [steerable_axle_number, setsteerable_axle_number] = useState();
  const [supply_contract, setsupply_contract] = useState();
  const [date_of_shipment_from_the_factory, setdate_of_shipment_from_the_factory] = useState();
  const [consignee, setconsignee] = useState();
  const [delivery_address, setdelivery_address] = useState();
  const [equipment, setequipment] = useState();
  const [client, setclient] = useState();
  const [service_company, setservice_company] = useState();
  
  const [groupUser, setgroupUser] = useState('');
  const [mode, setmode] = useState('readOnly');
 
  
  
  useEffect(() => {
  const is_authorized = localStorage.getItem('is_authorized')
  setgroupUser(localStorage.getItem('сategory'));
  if(props.mode=="new"){
    editmode()   }

},[]);
  useEffect(() => {
    async function async_technique_model() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Technique_model/");
            settechnique_model_spr(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async_technique_model();
},[]);
    useEffect(() => {
    async function async_engine_model() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Engine_model/");
            setengine_model_spr(response.data);          
        } catch (error) {
            console.log(error);
        }
    }
    async_engine_model();
    
  },[]);
  useEffect(() => {
    async function async_transmission_mode() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Transmission_model/");
            settransmission_model_spr(response.data);     
        } catch (error) {
            console.log(error);
        }
    }
    async_transmission_mode();
    
  },[]);
  useEffect(() => {
    async function async_drive_axle_model() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Drive_axle_model/");
            setdrive_axle_model_spr(response.data);   
        } catch (error) {
            console.log(error);
        }
    }
    async_drive_axle_model();
    
  },[]);
  useEffect(() => {
    async function async_steerable_axle_model() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Steerable_axle_model/");
            setsteerable_axle_model_spr(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async_steerable_axle_model();
    
  },[]);
  useEffect(() => {
    async function async_Counterparty() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/account/Counterparty/");
            setCounterparty_spr(response.data);   
        } catch (error) {
            console.log(error);
        }
    }
    async_Counterparty();
    
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
   

   // {props.data[0].name}
   //<button onClick={() => this.setState({ in_detail: true })}>Закрыть</button>
 
 
   const setClose = () => {  
    props.in_detail()   
  };
  const editmode= () => {
    setmode('')
  }
  const readmode= () => {
    setmode('readOnly')
  }
  const save= () => {
    const token = localStorage.getItem('Token')
    const base_url = "http://127.0.0.1:8000/mysilant/Car_Info/"
    
    let data = new FormData();
    data.append('factory_number', factory_number);
    data.append('technique_model', technique_model);
    data.append('engine_model', engine_model);
    data.append('engine_number', engine_number);
    data.append('transmission_model', transmission_model);
    data.append('transmission_number', transmission_number);
    data.append('drive_axle_model', drive_axle_model);
    data.append('drive_axle_number', drive_axle_number);
    data.append('steerable_axle_modele', steerable_axle_modele);
    data.append('steerable_axle_number', steerable_axle_number);    
    data.append('supply_contract', supply_contract);
    data.append('date_of_shipment_from_the_factory', date_of_shipment_from_the_factory);
    data.append('consignee', consignee);
    data.append('delivery_address', delivery_address);
    data.append('equipment', equipment);
    data.append('client', client);
    data.append('service_company', service_company); 
    if(props.mode=="new"){
        axios.post(base_url, data, {
            headers:{'Authorization': 'Token '+token,} 
          }).then((response) => {
              alert("Запись успешно добавлена")
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
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            alert("Ошибка обновления данных")
          });
        
    }



  }
  const deleteid= () => {
    const token = localStorage.getItem('Token')
    const base_url = "http://127.0.0.1:8000/mysilant/Car_Info"  
        axios.delete(base_url+id+"/", {
         headers:{'Authorization': 'Token '+token,} 
        }).then((response) => {
         console.log(JSON.stringify(response.data));
         })
         .catch((error) => {
         alert("Имеются связанные данные Уданение не возможно ");
  });
};
  
useEffect(() => {
    async function async_full_car_info() {
        try {            
            const response = await axios.get("http://127.0.0.1:8000/mysilant/Car_Info/?id="+props.item);
            setfull_car_info(response.data);
               
                setid(props.item)
                //setid(localStorage.getItem('selectedId'))
                setfactory_number(response.data[0].factory_number)
                settechnique_model(response.data[0].technique_model)
                setengine_model(response.data[0].engine_model)
                setengine_number(response.data[0].engine_number)
                settransmission_model(response.data[0].transmission_model)
                settransmission_number(response.data[0].transmission_number)
                setdrive_axle_model(response.data[0].drive_axle_model)
                setdrive_axle_number(response.data[0].drive_axle_number)
                setsteerable_axle_model(response.data[0].steerable_axle_model)
                setsteerable_axle_number(response.data[0].steerable_axle_number)
                setsupply_contract(response.data[0].supply_contract)
                setdate_of_shipment_from_the_factory(response.data[0].date_of_shipment_from_the_factory)
                setconsignee(response.data[0].consignee)
                setdelivery_address(response.data[0].delivery_address)
                setequipment(response.data[0].equipment)
                setclient(response.data[0].client)
                setservice_company(response.data[0].service_company)
                
        } catch (error) {
            console.log(error);
        }
    }
    if(props.mode=="edit"){
    async_full_car_info();   }   
},[props.item]);

   return (
    <main className='FullDateForm'>
      <div className='FullDateForm' >     
      <form> 
      <h1>Информация по машине</h1>
        <text>Заводской номер</text>       
        <input type='text' readOnly={mode} defaultValue={factory_number} onChange={e=>setfactory_number(e.target.value)} ></input>
        <text>Модель техники</text>
        <select size="1" disabled ={mode} onChange={e=>settechnique_model(e.target.value)}  >
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Модель техники</option> }      
        {technique_model_spr.map(value =>{         
        return (value.id!=technique_model)&&(<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
   </select>
   
        <text>Модель двигателя</text>
        <select size="1" disabled ={mode} onChange={e=>setengine_model(e.target.value)}  >
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Модель двигателя</option> }       
        {engine_model_spr.map(value =>{         
        return (value.id!=engine_model)&&(<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>)  
})}
   </select>
   <br></br>
        <text>Номер двигателя</text>
        <input type='text' readOnly={mode} defaultValue={engine_number} onChange={e=>setengine_number(e.target.value)} ></input>
        <text>Модель трансмиссии</text>
        <select size="1" disabled ={mode} onChange={e=>settransmission_model(e.target.value)}  >
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Модель трансмиссии</option> }       
        {transmission_model_spr.map(value =>{         
        return (value.id!=transmission_model)&&(<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
   </select>
        <text>Номер трансмиссии</text>
        <input type='text' readOnly={mode} defaultValue={transmission_number} onChange={e=>settransmission_number(e.target.value)} ></input>
        <br></br>
        <text>Модель ведущего моста</text>
        <select size="1" disabled ={mode} onChange={e=>setdrive_axle_model(e.target.value)}  >
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Модель ведущего моста</option>}       
        {drive_axle_model_spr.map(value =>{         
        return (value.id!=drive_axle_model)&& (<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
   </select>
        <text>Номер ведущего моста</text>
        <input type='text' readOnly={mode} defaultValue={drive_axle_number} onChange={e=>setdrive_axle_number(e.target.value)} ></input>
        <br></br>
        <text>Модель управляемого моста</text>
        <select size="1" disabled ={mode} onChange={e=>setsteerable_axle_model(e.target.value)}  >
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Модель управляемого моста</option> }       
        {steerable_axle_modele_spr.map(value =>{         
        return (value.id!=steerable_axle_modele)&&(<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
   </select>
        <text>Номер управляемого моста</text>
        <input type='text' readOnly={mode} defaultValue={steerable_axle_number} onChange={e=>setsteerable_axle_number(e.target.value)} ></input>
        <br></br>
        <text>Договор поставки №, дата.</text>
        <input type='text' readOnly={mode} defaultValue={supply_contract} onChange={e=>setsupply_contract(e.target.value)} ></input>
        <text>Дата отгрузки с завода</text>
        <input type='date' readOnly={mode} defaultValue={date_of_shipment_from_the_factory} onChange={e=>setdate_of_shipment_from_the_factory(e.target.value)}  ></input>
        <text>Грузополучатель</text>
        <input type='text' readOnly={mode} defaultValue={consignee} onChange={e=>setconsignee(e.target.value)} ></input>
        <br></br>
        <text>Адрес поставки (эксплуатации)</text>
        <input type='text' readOnly={mode} defaultValue={delivery_address} onChange={e=>setdelivery_address(e.target.value)} ></input>
        <text>Комплектация (доп. опции)</text>
        <input type='text' readOnly={mode} defaultValue={equipment} onChange={e=>setequipment(e.target.value)} ></input>
        <br></br>
        <text>Клиент</text>
        <select size="1" disabled ={mode} onChange={e=>setclient(e.target.value)}  >        
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Клиента </option> }           
        {Counterparty_spr.map(value =>{         
        return (value.id!=client)&& (<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
   </select>

        <text>Сервисная организация</text>
        <select size="1" disabled ={mode} onChange={e=>setservice_company(e.target.value)}  >
        {(props.mode=="new")&&
        <option disabled selected value>Выберите Сервисную организацию </option>}            
        {service_company_spr.map(value =>{         
        return (value.id!=service_company)&& (<option value={value.id}>{value.name}</option>)||(<option defaultValue={value.id}>{value.name}</option>) 
})}
   </select>
     </form>
        <br></br>
               
        {(mode=="readOnly"&&groupUser=="Менеджер")&&
        <button type="button" onClick={editmode}>Редактировать</button>    
        }        
        {(mode!="readOnly"&&groupUser=="Менеджер")&&
        <button type="button" onClick={save}>Сохранить</button>    
        }
        {(mode!="readOnly"&&props.mode!="new"&&groupUser=="Менеджер")&&
        <button type="button" onClick={deleteid}>Удалить</button>    
        } 
        {(mode!="readOnly"&&props.mode!="new"&&groupUser=="Менеджер")&&
        <button type="button" onClick={readmode}>Отмена</button>}
        {(props.formmode!="car")&&
        <button type="button" onClick={setClose}>Закрыть</button> 
}     <br></br>
      
      
     
      
      </div> 
    </main>
  )
}

export default FullDateForm