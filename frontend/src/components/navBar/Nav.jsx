import React from 'react'

import {Link} from "react-router-dom"
import "./Nav.css"
const Nav = () => {
  return (
    <div class="parent_Nav_container">
        <div className="left_nav_container">
           <Link to="/"><h1>Search</h1></Link> 
        </div>
        <div className="right_nav_container">
        <Link to="/paid"><h1>Get Answers From Others</h1></Link> 
        </div>
    </div>
  )
}

export default Nav