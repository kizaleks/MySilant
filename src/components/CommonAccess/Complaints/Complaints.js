import axios from 'axios';
import React from "react";
import './Complaints.css';
import { useState, useRef } from "react";
import * as FormData from 'form-data'
import ComplaintsForm from './ComplaintsForm/ComplaintsForm';


import { ReactTabulator, reactFormatter } from "react-tabulator";


const options = {
 
  rowSelection: {
    mode: 'highlight',
    onChange: (data) => console.log(data),
  },
};

class Complaints extends React.Component{  
  //tabulatorRef = useRef(null);  
  state = {
    data: [],
    url:"http://127.0.0.1:8000/mysilant/ComplaintsGet/", 
    in_detail: false, 
    loding:false,   
    selectedId: "",
    mode: "edit"
    
  };
  ref = null;
  inDetail= () =>{    
    this.setState({ mode: "edit" }) 
    this.setState({ in_detail: true })       
  };

  create= () =>{    
    this.setState({ mode: "new" }) 
    this.setState({ in_detail: true })       
  };
  briefly= () =>{   
    this.setState({ in_detail: false });
    this.setState({ loding: false });   
  };
 
  columns = [   
    { title: "ID", field: "id",width: 150 },
    { title: "Машина", field: "car",align:"left", width: 250, headerFilter: "input",  },
    { title: "Сервисная организация", field: "service_company", align:"left", width: 250, headerFilter: "input",  },
    { title: "Дата отказа", field: "date_of_refusal", align:"left", width: 250, headerFilter: "input", },    
    { title: "Узел отказа", field: "Machine_components", align:"left", width: 250, headerFilter: "input",  },
    { title: "Способ восстановления", field: "recovery_method", align:"left", width: 250, headerFilter: "input",  },  
  ];
  
  rowClick = (e, row) => {   
    const id =row.getData().id; 
    this.setState({ selectedId: id});
    this.setState({ mode: "edit" }) 
    this.setState({ in_detail: true })   
  }; 

  setData = () => {
    this.setState({ data: [] });
    const token = localStorage.getItem('Token')
    let сategory="";
    let company="";
    //сategory ="manufacturer" 
     if(localStorage.getItem('сategory')=="Менеджер"){
      сategory ="manufacturer"
      company = localStorage.getItem('company_id')
     }
     if(localStorage.getItem('сategory')=="Сервисная организация"){
      сategory ="service_company"
      company = localStorage.getItem('company_name')
    }
     if(localStorage.getItem('сategory')=="Клиент"){
      сategory ="client"
      company= localStorage.getItem('company_id')
    }
     
    //alert(this.state.url+"?type_company="+сategory+"&id_company="+company_id)          
    this.setState({loding: true});
    if(this.props.formmode=="full"){
    axios.get(this.state.url+"?typecompany="+сategory+"&company="+company).then(res => {   
        this.setState({ data: res.data}); 
        localStorage.setItem('data', res.data)              
          }).catch(function (error) {     }) 
        }
        if(this.props.formmode=="car"){
          axios.get(this.state.url+"?car="+this.props.car).then(res => {   
              this.setState({ data: res.data}); 
              localStorage.setItem('data', res.data)              
                }).catch(function (error) {     }) 
              }
  };
 


  render() {
    const options = {
      height: 300,
      width:500,
      
      

      rowClick: (e, row) => {
        const id =row.getData().id; 
    this.setState({ selectedId: id});
    this.setState({ mode: "edit" }) 
    this.setState({ in_detail: true })       
      },      
    }; 
    return (
      <div className="complaintstitle">      
      <h1 >Информация по рекламациям </h1> 
      {(!this.state.loding)&& 
      this.setData()
  }   
      
      {(!this.state.in_detail)&&
        <ReactTabulator  columns={this.columns} data={this.state.data} events={{
            rowClick: this.rowClick
          }} options={options} />
        } 
      
    
          {(this.state.in_detail)&&
         <ComplaintsForm in_detail={this.briefly} item={this.state.selectedId} mode={this.state.mode} 
         formmode={this.props.formmode} car={this.props.car}/> 
          } 
          <label className='Button'>
                {(!this.state.in_detail&&localStorage.getItem('сategory')!="Клиент")&&
        <button onClick={this.create}>Добавить</button>
  }          </label>          
  

      </div>
    );
  }
}

export default Complaints
