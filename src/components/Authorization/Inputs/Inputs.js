import React from 'react'
import './Inputs.css'
const Inputs = ({username, password, setLogin, setPassword, error}) => {
  const handlePassword = (evt) => {
    setPassword(evt.target.value)
  }
  const handleLogin = (evt) => {
    setLogin(evt.target.value)
  }
  const visibility = error ? 'visible' : 'hidden'
  const inputColor = error ? 'red' : '#C7C7C7'
  return (
    <form className='form'>
        <label className='form__label' htmlFor='username'>Логин или номер телефона:</label>
        <input className='form__loginInput' onChange={handleLogin} id='username' type='text'/>
        <label className='form__label' htmlFor='password'>Пароль:</label>
        <input className='form__loginInput' 
        onChange={handlePassword} 
        id='password' 
        type='password'
        style={{borderColor:inputColor}}/>
        <span className='form__errText'style={{visibility}}>Неправильный пароль</span>
    </form>
  )
}

export default Inputs
