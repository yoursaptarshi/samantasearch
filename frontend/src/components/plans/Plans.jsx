import "./plans.css"
import React, { useEffect, useState } from 'react'
import {allMemberships, buyMembership} from "../../Actions/memberships"
import { useDispatch,useSelector } from "react-redux"

const Plans = () => {
    const dispatch = useDispatch()
useEffect(() => {
  dispatch(allMemberships())  
}, [])

const[membership,getMembership]=useState('');

function buyHandler(){
    dispatch(buyMembership(membership))
    
}
const check_buy_status = useSelector((state)=>state.membership.purchase)

   

const memberships = useSelector((state)=>state.membership.memberships)
  return (
    <div className="plans_main_container">
        <div className="plans_parent">
            
            {memberships && memberships.length>0 && 
            (
                <table>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                        Buy
                        </th>
                        
                    </tr>
                    {memberships.map((element,index)=>{
                      return  <tr key={index} >
                            <td>{element.membership_name}</td>
                            <td>{element.membership_description}</td>
                            <td><button onClick={()=>{getMembership(element.membership_name);buyHandler();console.log(element.membership_name)}} >{element.membership_price} INR</button></td>
                        </tr>
                    })}
                </table>
            )
            }
        </div>
    </div>
  )
}

export default Plans