import React from 'react'
import "./register.css"
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {registerUser} from "../../Actions/user";
const Register = () => {
const[name,setName]=useState("");
const[userName,setUsername]=useState("");
const[email,setEmail]=useState("");
// const[gender,setGender]=useState("");
// const[dob,setDob]=useState("");
const[password,setPassword]=useState("");
const dispatch = useDispatch();
const registerHandler = async (e)=>{
   
    
   // setGender(document.querySelector(".register_gender_input_field").value);
   // setDob(document.querySelector(".register_dob_input_field").value);
    
   await dispatch(registerUser(name,userName,email,password));
   
}
    return (
        
        <div className="main">
            <div className="register_wrapper">
                <div className="field_wrapper">
                    <div className="name_wrapper">
                        <div className="name_text">
                            <h2>Name</h2>
                        </div>
                        <div className="name_input">
                            <input type="text" placeholder="Saptarshi Samanta" className="register_name_input_field" value={name} onChange={(e)=>{setName(e.target.value)}}required/>
                        </div>
                    </div>
                    <div className="username_wrapper">
                        <div className="username_text">
                        <h2>UserName</h2>
                        </div>
                        <div className="username_field">
                        <input type="text" placeholder="username" className="register_username_input_field" value={userName} onChange={(e)=>{setUsername(e.target.value)}} required/>
                        </div>
                    </div>
                    <div className="email_wrapper">
                        <div className="email_text">
                        <h2>Email</h2>
                        </div>
                        <div className="email_input">
                        <input type="email" placeholder="saptarshi@test.com" className="register_email_input_field" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                        </div>
                    </div>
                    {/* <div className="gender_wrapper">
                        <div className="gender_text">
                        <h2>Gender</h2>
                        </div>
                        <div className="gender_input">
                            <select id="gender" className="register_gender_input_field">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">other</option>
                            </select>
                        </div>
                    </div> */}
                    {/* <div className="dob_wrapper">
                        <div className="dob_text">
                        <h2>DOB</h2>
                        </div>
                        <div className="dob_input">
                            <input type="date" className="register_dob_input_field"/>
                        </div>
                    </div> */}
                    <div className="password_wrapper">
                        <div className="password_text">
                            <h2>Password</h2>
                        </div>
                        
                        <div className="password_input">
                        <input type="text" placeholder="**********" className="register_password_input_field" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                        </div>
                    </div>
                    <div className="button_wrapper_register">
                        <div className="button">
                            <button type="submit" onClick={registerHandler}>Submit</button>
                        </div>
                    </div>
                    <p>Already Registered?</p><Link to="/">SignIn</Link>
                
                </div>
            </div>
        </div>
       
    )
}

export default Register