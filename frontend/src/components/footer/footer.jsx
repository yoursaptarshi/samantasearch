import React from 'react'
import "./footer.css"
import {Link} from "react-router-dom";
const footer = () => {
    return (
        <div className="footer_main">
            <div className="footer_wrapper">
                <div className="footer_col1">
                   <Link to="/"><button >Home</button></Link> 
                </div>
                <div className="footer_col2">
                <Link to="/signin"><button>Signin</button></Link>
                </div>
                <div className="footer_col3">
                <Link to="/register"><button>Register</button></Link>
                </div>
            </div>
        </div>
    )
}

export default footer