import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import React from 'react'
import Header from "./components/header/header"
import Signin from "./components/signin/Signin.jsx"
import Register from "./components/register/Register.jsx"
import Footer from"./components/footer/footer.jsx"
import Profile from "./components/profile/Profile.jsx"
import Paid from "./components/paid/Paid.jsx"
import Home from "./components/home/Home.jsx"
import Admin from "./components/admin/Admin.jsx"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser,adminuser } from './Actions/user.js';
import Nav from "./components/navBar/Nav.jsx"
import Plans from './components/plans/Plans.jsx';

const App = () => {
const {isAuthenticated}=useSelector((state)=>state.user)

const dispatch =useDispatch();
const isAdmin = useSelector((state)=>state.user.isAdmin);
const data =useSelector((state)=>state.user)
useEffect(()=>{
  dispatch(loadUser());
 
},[dispatch]);

useEffect(()=>{
  dispatch(adminuser());
},[dispatch]);

let paidRoute;
const membership = data && data.user ? data.user.membership : null;
if (membership === "test_membership") {
  paidRoute = <Route path="/paid" element={isAuthenticated ? <Paid /> : <Signin/>} />;
} else {
  paidRoute = <Route path="/paid" element={isAuthenticated ? <Plans/> : <Signin/>}/>;
}


  return (
    
    <Router>
      {console.log(membership)}
      { !isAuthenticated && <Header/>}
      { isAuthenticated && <Nav/>} 
      <Routes>
      <Route path="/" element={isAuthenticated ? <Home/> : <Signin/>}/>
        <Route path="/signin" element={isAuthenticated ? <Home/> : <Signin/>}/>
        <Route path="/register" element= {isAuthenticated ? <Home/> : <Register/>}/>
        {paidRoute}
        <Route path="/profile" element={isAuthenticated ? <Profile/> : <Signin/>}/>
        <Route path="/plans" element={isAuthenticated ? <Plans/> : <Signin/>}/>
        <Route path="/admin" element={isAdmin ? <Admin/> :(isAuthenticated ? <Home/> : <Signin/>) }/>
      </Routes>
      {/* { !isAuthenticated &&  <Footer/>} */}
     
      </Router>
  )
}

export default App