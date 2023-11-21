import axios from 'axios';
import React from "react";
import  {useState, useEffect} from "react";

import * as FormData from 'form-data'
import FullDateForm from './FullDateForm/FullDateForm';
import TO_and_complaint from './TOandcomplaints/TOandcomplaints';
import "./InfoCar.css"

import { ReactTabulator, reactFormatter } from "react-tabulator";


const options = {
  rowSelection: {
    mode: 'highlight',
    onChange: (data) => console.log(data),
  },
};


class InfoCar extends React.Component {  
  //tabulatorRef = useRef(null);  
  state = {
    data: [],
    url:"http://127.0.0.1:8000/mysilant/Full_Car_Get/", 
    in_detail: "table", 
    loding:false,  
    selectedId: "",
    selectedCar: "",
    mode: "edit"
    
  };
  ref = null;
  inDetail= () =>{     
    alert(this.state.selectedId)
    this.setState({ mode: "edit" }) 
    this.setState({ in_detail: "look_car" })       
  };
to_and_complaints= () =>{   
  this.setState({ in_detail: "info_car" })       
};
  create= () =>{ 
    
    this.setState({ mode: "new" }) 
    this.setState({ in_detail: "look_car" })       
  };
  briefly= () =>{   
    this.setState({ loding: false});
    this.setState({ in_detail: "table" });   
  };

  columns = [   
    { title: "ID", field: "id",width: 70,frozen:true },
    { title: "Заводской номер", field: "factory_number", width: 250, headerFilter: "input",frozen:true },
    { title: "Дата отгрузки с завода", field: "date_of_shipment_from_the_factory", width: 200, headerFilter: "input", },
    { title: "Модель техники", field: "technique_model", width: 250, headerFilter: "input", },
    { title: "Модель двигателя", field: "engine_model", width: 200, headerFilter: "input", },
    { title: "Модель трансмиссии ", field: "transmission_model", width: 250, headerFilter: "input", },
    { title: "Модель ведущего моста", field: "drive_axle_model", width: 250, headerFilter: "input", },   
    { title: "Модель управляемого моста", field: "steerable_axle_model", width: 250, headerFilter: "input", },    
  ];
  
  rowClick = (e, row) => {
   const id =row.getData().id;  
    this.setState({ selectedId: id});
    this.setState({ selectedCar: row.getData().factory_number});    
    this.setState({ mode: "edit" }) 
    this.setState({ in_detail: "info_car" })      
  }; 

  setData = () => {
    this.setState({ data: [] });
    const token = localStorage.getItem('Token')
    let сategory="";
   
     if(localStorage.getItem('сategory')=="Менеджер"){сategory ="manufacturer" }
     if(localStorage.getItem('сategory')=="Сервисная организация"){сategory ="service_company"}
     if(localStorage.getItem('сategory')=="Клиент"){сategory ="client"}
     const company_id = localStorage.getItem('company_id')
            
    this.setState({loding: true});
    axios.get(this.state.url+"?type_company="+сategory+"&id_company="+company_id).then(res => {   
        this.setState({ data: res.data});
         
          }).catch(function (error) {     })    
  };
  
    
  
  render() {
    const options = {
      height: 300,
      width:500,     

      rowClick: (e, row) => {
        const id =row.getData().id;  
        this.setState({ selectedId: id});
        this.setState({ selectedCar: row.getData().factory_number});    
        this.setState({ mode: "edit" }) 
        this.setState({ in_detail: "info_car" })  
         },      
    };
    
    return (
      <div className="infocar_title"> 
         {(this.state.in_detail=="table")&&     
      <h1>Информация по машинам</h1>}
      {(!this.state.loding)&& 
      this.setData()
  }   
        
      
      {(this.state.in_detail=="table")&&
        <ReactTabulator columns={this.columns} data={this.state.data} events={{
            rowClick: this.rowClick
          }} options={options} />
        } 
          {(this.state.in_detail=="look_car")&&
         <FullDateForm in_detail={this.briefly} item={this.state.selectedId} mode={this.state.mode}/> 
          }   
          <label className='Button'>
                 {(this.state.in_detail=="table"&&localStorage.getItem('сategory')=="Менеджер")&&
        <button onClick={this.create}>Добавить</button>  } 
            </label>        
  
        {(this.state.in_detail=="info_car")&&
         <TO_and_complaint in_detail={this.briefly} car={this.state.selectedId} mode={this.state.mode}
         factory_number={this.state.factory_number}/> 
          }


      </div>
    );
  }
}

export default InfoCar;