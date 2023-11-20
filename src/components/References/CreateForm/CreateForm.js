import React from 'react';
import  {useState} from "react";
import * as FormData from 'form-data'
import axios from 'axios';
import "./CreateForm.css"



const CreateForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('Token')
  const base_url = localStorage.getItem('Url')

  
  const add_entry= () => {    
    const token = localStorage.getItem('Token')
    const base_url = localStorage.getItem('Url')
    //alert(rowData.name)
       
    let data = new FormData();
    data.append('name', name);
    data.append('description', description);
    //alert(name+" "+description)
      
    axios.post(base_url, data, {
      headers:{'Authorization': 'Token '+token,} 
    }).then((response) => {
        alert("Запись успешно добавлена")
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  };
  return (
    <main className='createform'>
      <div className='createform'>      
      <form> 
      <h1> Форма добавления</h1>
      <text> Название</text>
      <input type="text" onChange={e=>setName(e.target.value)}/> 
      <br></br>
      <text> Описание</text>
      <input type="text" onChange={e=>setDescription(e.target.value)}/>
      <br></br>
      </form>
      <button onClick={add_entry}>Добавить</button> 
       
      
      </div> 
    </main>
  )
}

export default CreateForm
