import React from 'react'
import  './CompanyInfo.css'


  
const CompanyInfo = () => {
const user_name = localStorage.getItem('user_name');
const сategory = localStorage.getItem('сategory');
const company_name = localStorage.getItem('company_name');
 
  return (
        <div className='CompanyInfo'>
          <text>
           Вы авторизировались как: {user_name}, Категория пользователей: {сategory}, Компания {company_name} 
          </text>
        
      </div>
        
  )
}

export default CompanyInfo
