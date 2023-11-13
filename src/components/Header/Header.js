import React from 'react';
import { useSelector } from 'react-redux';
import './Header.css';
import AccountBeforeAuthorization from './AccountBeforeAuthorization/AccountBeforeAuthorization';
import AccountAfterAuthorization from './AccountAfterAuthorization/AccountAfterAuthorization';
import NavBar from './NavBar/NavBar';

import logo from './Logotype.jpg';

function Header() {
  let authorized_status = useSelector(state => state.profile.status)
  const is_authorized = localStorage.getItem('is_authorized');  
  const AccountElement = is_authorized ? AccountAfterAuthorization : AccountBeforeAuthorization
   //  
  return (
    <header className='header'>
      <div className='header__wrapper'>
      <div className='logo'>
        <img src={logo} alt='logo'/>
       
    </div>
        <NavBar />
       <AccountElement />
        </div> 

    </header>
  )
}

export default Header
