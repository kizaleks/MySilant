import React from 'react'
import {useNavigate} from 'react-router-dom';
import { signOut } from '../../../store/profile';
import { useDispatch } from 'react-redux';
import './AccountAfterAuthorization.css'


const AccountAfterAuthorization = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function handleClick() {
  // props.in_detail() 
    navigate("/login");
    dispatch(signOut()); 
      
  } 
return (
    <div className='accountPanel'> 
     <button className='avatar__button' type="button" onClick={handleClick}>
     Выйти/Войти
    </button>
      </div>
  )
}

export default AccountAfterAuthorization
