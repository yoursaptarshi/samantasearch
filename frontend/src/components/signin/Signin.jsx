import React from 'react'
import "./signin.css"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import{loginUser} from "../../Actions/user";
import { useState} from 'react';

const Signin = () => {
const [username,setUsername]=useState("");
const[password,setPassword]=useState("");
const dispatch = useDispatch();

const loginHandler = async ()=>{
  dispatch(loginUser(username,password));
}



  

  return (
    
    <div className="signin_main">
      <div className="main_signin">
        <div className="feild_wrapper">

        <div className="username_wrapper">
        <div className="username_text">
          <h2>UserName</h2>
        </div>
        <div className="username_input">
          <input className="input_username_field" type='text'placeholder='username'value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        </div>
        </div>
        <div className="password_wrapper">
          <div className="password_text">
          <h2>Password</h2>
          </div>
          <div className="password_input">
          <input type='text' className="input_password_field" placeholder='**********' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
        </div>
        <div className="button_wrapper">
          <div className="button_signin">
            <button type='submit' onClick={loginHandler}>Submit</button>
          </div>
        </div>
        <div className="register_link_wrapper">
        <p>Have not registered? </p><Link to ="/register" >Register Now</Link>
        </div>
        </div>
     
      </div>
    </div>
    
  )
}

export default Signin;