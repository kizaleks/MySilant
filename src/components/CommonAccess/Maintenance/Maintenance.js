import axios from 'axios';
import React from "react";
import { useState, useRef } from "react";
//import "./References.css";
import * as FormData from 'form-data'
import MaintenanceForm from './MaintenanceForm/MaintenanceForm';
//import CreateForm from './CreateForm/CreateForm';
//import React, { useState, useRef } from "react";

//import "react-tabulator/lib/styles.css"; // default theme
//import "react-tabulator/css/tabulator_midnight.css"; // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator";


const options = {
  /*layoutColumnsOnNewData: true,
  layout: "fitColumns", //fit columns to width of table (optional)
  responsiveLayout: "hide", //hide columns that dont fit on the table
  tooltips: true, //show tool tips on cells
  addRowPos: "top", //when adding a new row, add it to the top of the table
  history: true, //allow undo and redo actions on the table
  groupBy: "userId",
  pagination: "local", //paginate the data
  paginationSize: 2, //allow 20 rows per page of data
  paginationSizeSelector: [2, 5, 10, 200],
  movableColumns: true, //allow column order to be changed
  resizableRows: true //allow row order to be changed*/
  rowSelection: {
    mode: 'highlight',
    onChange: (data) => console.log(data),
  },
};
/*
function inDetail() {    
  alert("Кратко")
  this.setState({ in_detail: false });   
};*/

class Maintenance  extends React.Component {  
  //tabulatorRef = useRef(null);  
  state = {
    data: [],
    url:"http://127.0.0.1:8000/mysilant/MaintenanceGet/", 
    in_detail: false, 
    loding:false,   
    selectedId: "",
    mode: "edit"
    
  };
  ref = null;
  inDetail= () =>{ 
    //this.rowClick()  
    //this.setState({ selectedName: rowData.id });
    this.setState({ mode: "edit" }) 
    this.setState({ in_detail: true })       
  };

  create= () =>{ 
    //this.rowClick()  
    //this.setState({ selectedName: rowData.id });
    this.setState({ mode: "new" }) 
    this.setState({ in_detail: true })       
  };
  briefly= () =>{   
    this.setState({ in_detail: false }); 
    this.setState({ loding: false });   
  };

  columns = [
   // { title: '', field: 'checkbox', align: 'center', headerSort: false, formatter: 'rowSelection' },
    { title: "ID", field: "id",width: 150 },
    { title: "Машина", field: "car", width: 250, headerFilter: "input", },
    { title: "Сервисная организация", field: "service_company", width: 250, headerFilter: "input",  },
    { title: "Вид ТО", field: "type_maintenance", width: 250, headerFilter: "input",},
    { title: "Дата проведения ТО", field: "maintenance_date", width: 250, headerFilter: "input",},
    
    
  ];
  
  rowClick = (e, row) => {
    // console.log("ref table: ", this.ref.current); // this is the Tabulator table instance
    // console.log(`rowClick id: \${row.getData().id}`, row, e);
   // alert(this.state.data[row.getPosition(true)-1].name)
    //this.setState({ selectedId: row.getPosition(true)-1 });
    const id =row.getData().id; 
    this.setState({ selectedId: id});
    this.setState({ mode: "edit" }) 
    this.setState({ in_detail: true })
    //row.getData().name
   // this.setState({ in_detail: true}); 
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
     const company_id = localStorage.getItem('company_id')
    //alert(this.state.url+"?type_company="+сategory+"&id_company="+company_id)          
    this.setState({loding: true});
    //?id="+props
    if(this.props.formmode=="full"){
     // this.setState({loding: true});
     
    axios.get(this.state.url+"?typecompany="+сategory+"&company="+company).then(res => {   
        this.setState({ data: res.data}); 
        localStorage.setItem('data', res.data)              
          }).catch(function (error) {     })  
        } 
   if(this.props.formmode=="car"){
    
    this.setState({ selectedId: this.props.car});
    axios.get(this.state.url+"?car="+this.props.car).then(res => {   
        this.setState({ data: res.data});                    
          }).catch(function (error) {  })  
        }       
  };
  


  render() {
    const options = {
      height: 300,
      width:500,
      //movableRows: true,
      //selectable: true,
      rowClick: (e, row) => {
        console.log("clicked");
        this.setState({ selectedId: "row._cell" });
      },      
    };
    return (
      <div>      
      <h1>Информация по ТО  
      </h1>
      {(!this.state.loding)&& 
      this.setData()
  } 
      {(!this.state.in_detail)&&
        <ReactTabulator columns={this.columns} data={this.state.data} events={{
            rowClick: this.rowClick
          }} options={options} />
        } 
          {(this.state.in_detail)&&
         <MaintenanceForm in_detail={this.briefly} item={this.state.selectedId} mode={this.state.mode} 
         formmode={this.props.formmode} car={this.props.car} /> 
          }  
          <label className='Button'>
             {(!this.state.in_detail)&&
        <button onClick={this.create}>Добавить</button>  }
            </label>         
       

      </div>
    );
  }
}

export default Maintenance;
