import React from 'react'
import './NavBar.css'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { use } from "react-redux";
//import {useNavigate} from 'react-router-dom';
//const navigate = useNavigate();
import  {useState, useEffect} from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  let authorized_status = useSelector(state => state.profile.status)
  
  
  //
 
  
  return (
    <nav className='menu'>
        <Link className='menu__link menu__link_active' to='/'>Главная</Link>    
             
    </nav>
  )
}

export default NavBar
