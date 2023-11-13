import React from 'react'
import './Authorization.css'

import FormAuthorization from './Form/Form';
import { useSelector } from 'react-redux';

const Authorization = () => {
  const newWidth = useSelector(state => state.app.width)
  
  const isShown = newWidth < 1270 ? true : false;
  return (
    <main className='main'>
      <div className='main__wrapper-auth'>
        <div className='main__leftBox'>
          <h1 className='main__title'>Авторизируйтесь что бы видеть больше информации.</h1>
    
        </div>
        <div className='main__rightBox'>          
          <FormAuthorization />
        </div>
      </div>
    </main>
  )
}

export default Authorization
