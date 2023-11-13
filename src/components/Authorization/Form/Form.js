import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Inputs from '../Inputs/Inputs';
import './Form.css';
import { dropStatus, signIn } from '../../../store/profile';

const FormAuthorization = () => {
  const [username, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signInStatus = useSelector(state => state.profile.status)
  useEffect(()=>{
    if(signInStatus === 'done'){
      navigate("/");
      dispatch(dropStatus())
    }
    if(signInStatus === 'error'){      
      setError(true);
    }
  },[error , signInStatus, navigate, dispatch])
  const  handleSubmit = async () => {
    dispatch(signIn({
      username,
      password
    }))
       
  }
  const submitDisable = !( username && password )
  return (
      <div className='form__container'>
        <div className='form__linkBox'>
          <a >Войти</a>          
        </div>
        <Inputs 
        username={username} 
        password={password} 
        setLogin={setLogin} 
        setPassword={setPassword}
        error={error}
        />
        <button 
        className='form__button' 
        onClick={handleSubmit} 
        disabled={submitDisable}
        style={submitDisable ? {opacity:`${'50%'}`} : {opacity:`${'100%'}`}}>Войти</button>

      </div>
  )
}

export default FormAuthorization

