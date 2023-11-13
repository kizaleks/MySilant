import React from 'react';
import './AccountBeforeAuthorization.css';

import { useNavigate } from "react-router-dom";


const AccountBeforeAuthorization = (props) => {
  const navigate = useNavigate();

  function handleClick() {
   //props.in_detail() 
    navigate("/login");
  }
  
  return (
    <div className='accountPanel'>        
       <button className='accountPanel__button' type="button" onClick={handleClick}>
      Выйти/Войти
    </button>
    </div> 
  )
}

export default AccountBeforeAuthorization;
