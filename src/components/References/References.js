import axios from 'axios';
import React from "react";
import { useState, useRef } from "react";
import "./References.css";
import * as FormData from 'form-data'
import CreateForm from './CreateForm/CreateForm';

//import React, { useState, useRef } from "react";

//import "react-tabulator/lib/styles.css"; // default theme
//import "react-tabulator/css/tabulator_midnight.min.css"; // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator";
/*
function SimpleButton(props) {
  const rowData = props.cell._cell.row.data;
  const cellValue = props.cell._cell.value || "Сохранить";
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}*/

function UpdateButton(props) {
  const rowData = props.cell._cell.row.data;
  const cellValue = props.cell._cell.value || "Сохранить";
  
  return <button onClick={() =>updateData(props)}>{cellValue}</button>;
}
function DeleteButton(props) {
  const rowData = props.cell._cell.row.data;
  const cellValue = props.cell._cell.value || "Удалить";  
  return <button onClick={() =>deleteData(props)}>{cellValue}</button>;
}


function updateData (props) {
  const rowData = props.cell._cell.row.data;
  const token = localStorage.getItem('Token')
  const base_url = localStorage.getItem('Url')
  //alert(rowData.name)
     
  let data = new FormData();
  data.append('name', rowData.name);
  data.append('description', rowData.description);
  data.append('id', rowData.id);  
  axios.patch(base_url+rowData.id+"/", data, {
    headers:{'Authorization': 'Token '+token,} 
  }).then((response) => {
    alert("Данные обновлены")
  })
  .catch((error) => {
    alert("Ошибка обновления данных")
  });
};
function deleteData (props) {
  const rowData = props.cell._cell.row.data;
  const token = localStorage.getItem('Token')
  const base_url = localStorage.getItem('Url')
  //alert(rowData.name)
     
  
  axios.delete(base_url+rowData.id+"/", {
    headers:{'Authorization': 'Token '+token,} 
  }).then((response) => {
    alert("Запись удалена ");
  })
  .catch((error) => {
    alert("Имеются связанные данные Уданение не возможно ");
  });
};

const options = {
  layoutColumnsOnNewData: true,
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
  resizableRows: true //allow row order to be changed
};

class References extends React.Component {  
  //tabulatorRef = useRef(null);
  state = {
    data: [],
    url:"http://127.0.0.1:8000/mysilant/Technique_model/",
    references_name:"Справочник Модели техники",
    selectedName: "",
    loding:false, 
  };
  ref = null;

  columns = [
    { title: "ID", field: "id",width: 150, },
    { title: "Наименование", field: "name", width: 350, headerFilter: "input", editor: "input", },
    { title: "Описание", field: "description", width: 450, headerFilter: "input", editor: "input", },
    { title: "Действие",field: "custom",width: 150,
      formatter: reactFormatter(
        <UpdateButton
          onSelect={(name) => {
            this.setState({ selectedName: name });
            alert(name);
          }}
        />
      )
    },
    { title: "Действие",field: "custom", width: 150, 
      formatter: reactFormatter(
        <DeleteButton
          onSelect={(name) => {
            this.setState({ selectedName: name });
            alert(name);
          }}
        />
      )
    } 
  ];
   columns_red = [
    { title: "ID", field: "id",width: 150, },
    { title: "Наименование", field: "name", width: 350, headerFilter: "input" },
    { title: "Описание", field: "description", width: 450, headerFilter: "input"},    
  ];
  columns_red2 = [
    { title: "ID", field: "id",width: 150, },
    { title: "Название", field: "name", width: 350, headerFilter: "input" },
    { title: "Телефон", field: "telephone", width: 450, headerFilter: "input"},    
  ];

  rowClick = (e, row) => {
    // console.log("ref table: ", this.ref.current); // this is the Tabulator table instance
    // console.log(`rowClick id: \${row.getData().id}`, row, e);
    this.setState({ selectedName: row.getData().name });
  };

  setUrl = (References) => {
    this.setState({ data: [] });
    this.setState({ loding: false });
    if(References=="Technique_model"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Technique_model/" }); 
      localStorage.setItem('Url', "http://127.0.0.1:8000/mysilant/Technique_model/")   
      this.setState({ references_name: "Справочник Модели техники" });
    }
    if(References=="Engine_model"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Engine_model/" });
      localStorage.setItem('Url', "http://127.0.0.1:8000/mysilant/Engine_model/") 
      this.setState({ references_name: "Справочник Модель двигателя" });    
    }
    if(References=="Transmission_model"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Transmission_model/" }); 
      localStorage.setItem('Url', "http://127.0.0.1:8000/mysilant/Transmission_model/")
      this.setState({ references_name: "Справочник Модель трансмиссии" });    
    }
    if(References=="Drive_axle_model"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Drive_axle_model/" }); 
      localStorage.setItem('Url',"http://127.0.0.1:8000/mysilant/Drive_axle_model/")
      this.setState({ references_name: "Справочник Модель ведущего моста" });    
    }
    if(References=="Steerable_axle_model"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Steerable_axle_model/" }); 
      localStorage.setItem('Url',"http://127.0.0.1:8000/mysilant/Steerable_axle_model/" )
      this.setState({ references_name: "Справочник Модель управляемого моста" });    
    }
    if(References=="Type_maintenance"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Type_maintenance/" }); 
      localStorage.setItem('Url', "http://127.0.0.1:8000/mysilant/Type_maintenance/" )
      this.setState({ references_name: "Справочник Модель Справочник Вид ТО" });    
    }
    if(References=="Description_failure"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Description_failure/" }); 
      localStorage.setItem('Url', "http://127.0.0.1:8000/mysilant/Description_failure/")
      this.setState({ references_name: "Справочник Характер отказа" });    
    }
    if(References=="Recovery_method"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Recovery_method/" }); 
      localStorage.setItem('Url', "http://127.0.0.1:8000/mysilant/Recovery_method/")
      this.setState({ references_name: "Справочник Способ восстановления" });    
    }
    if(References=="Machine_components"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Machine_components/" }); 
      localStorage.setItem('Url', "http://127.0.0.1:8000/mysilant/Machine_components/" )
      this.setState({ references_name: "Справочник Узлы машины" });    
    }  
    if(References=="Service_company"){
      this.setState({ url: "http://127.0.0.1:8000/mysilant/Service_company/" }); 
      localStorage.setItem('Url',"http://127.0.0.1:8000/mysilant/Service_company/")
      this.setState({ references_name: "Справочник Сервисные компании" });    
    }
    if(References=="Counterparty"){
      this.setState({ url: "http://127.0.0.1:8000/account/Counterparty/" }); 
      localStorage.setItem('Url',"http://127.0.0.1:8000/account/Counterparty/")
      this.setState({ references_name: "Справочник Контрагенты" });    
    }       
  };

  setData = () => {
    this.setState({ data: [] }); 
    this.setState({loding: true});     
    axios.get(this.state.url).then(res => {   
        this.setState({ data: res.data });               
          }).catch(function (error) {     })    
  };
  

  render() {
    const options = {
      height: 300,
      width:500,
      movableRows: true,
      selectable: true,
      rowClick: (e, row) => {
        console.log("clicked");
        this.setState({ selectedName: row.getData().name });
      },
      selectableCheck: function (row) {
        //row - row component
        return row.getData().color !== "yellow"; //allow selection of rows where the age is greater than 18
      },
      rowSelectionChanged: function (data, rows) {
        console.log("selected rows:", rows);
      }
    };
    return (
      <div className='References'>    
      <div className='References'>
      <label> <input onChange={e=>this.setUrl("Technique_model")} type="radio" name="Radio" value="Technique_model" defaultChecked={true} /> Справочник Модели техники </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Engine_model")} type="radio" name="Radio" value="Engine_model" /> Справочник Модель двигателя </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Transmission_model")} type="radio" name="Radio" value="Transmission_model" /> Справочник Модель трансмиссии </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Drive_axle_model")} type="radio" name="Radio" value="Drive_axle_model" /> Справочник Модель ведущего моста </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Steerable_axle_model")} type="radio" name="Radio" value="Steerable_axle_model" /> Справочник Модель управляемого моста </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Type_maintenance")} type="radio" name="Radio" value="Type_maintenance" /> Справочник Вид ТО'</label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Description_failure")} type="radio" name="Radio" value="Description_failure" /> Справочник Характер отказа </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Recovery_method")} type="radio" name="Radio" value="Recovery_method" /> Справочник Способ восстановления </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Machine_components")} type="radio" name="Radio" value="Machine_components" /> Справочник Узлы машины </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Service_company")} type="radio" name="Radio" value="Service_company" /> Справочник Сервисные компании </label>
      <br></br>
      <label> <input onChange={e=>this.setUrl("Counterparty")} type="radio" name="Radio" value="Counterparty" /> Справочник Контрагенты</label>
      <br></br>
      <br></br>
      </div>
      <div className='References'>
      {(!this.state.loding)&& 
      this.setData()
  } 
      <h1>{this.state.references_name}    
        </h1>
        {(localStorage.getItem('сategory')=="Менеджер"&&this.state.references_name!="Справочник Контрагенты")&&
        <ReactTabulator columns={this.columns} data={this.state.data} />
  }
  {(localStorage.getItem('сategory')=="Менеджер"&&this.state.references_name=="Справочник Контрагенты")&&
  <ReactTabulator columns={this.columns_red2} data={this.state.data} />
}
  {(localStorage.getItem('сategory')!="Менеджер"&&this.state.references_name!="Справочник Контрагенты")&&
        <ReactTabulator columns={this.columns_red} data={this.state.data} />
  }
  {(localStorage.getItem('сategory')!="Менеджер"&&this.state.references_name=="Справочник Контрагенты")&&
        <ReactTabulator columns={this.columns_red2} data={this.state.data} />
  }

  {(localStorage.getItem('сategory')=="Менеджер"&&this.state.references_name!="Справочник Контрагенты")&&
        <CreateForm/>
  }
  
      </div>   
      </div>
    );
  }
}

export default References;