import "./admin.css"
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux"
import { getallusers } from "../../Actions/user"
import { useState } from "react"

import {crawl} from "../../Actions/search"
import {allMemberships, createMembership} from "../../Actions/memberships"
const Admin = () => {
  const dispatch = useDispatch();
  useEffect( ()=>{
     dispatch(getallusers());
  },[])
  useEffect(()=>{
    dispatch(allMemberships())
    
    },[])
const data = useSelector((state)=>state.user);

const crawl_response = useSelector((state)=>state.search.response)
const membershipAdd_response = useSelector((state)=>state.membership.success)
const memberships = useSelector((state)=>state.membership.memberships)
const [URL,setURL]=useState('');


const urlSubmitHandler = (e)=>{
  
   dispatch(crawl(URL));
   alert("Crawling....")
  setTimeout(() => {
    if(crawl_response===true){
      alert("crawl success");
    }
    else if(crawl_response===null){
      alert("crawl error")
    }
    else{
      alert("Url Exists in Database")
    }
  }, 3000);
}
const [membershipName,setMembershipName]=useState('');
const [membershipPrice,setMembershipPrice]=useState(0);
const [membershipDescription,setMembershipDescription]=useState('');
const membershipAddHandler = ()=>{
   dispatch(createMembership(membershipName,membershipPrice,membershipDescription))
   setMembershipName('');
   setMembershipPrice(0);
   setMembershipDescription('');

  setTimeout(() => {
    if(membershipAdd_response===true){
      alert("Membership add success");
    }
    else if(membershipAdd_response===null){
      alert("Membership can not be added")
    }
    else{
      alert("Membership already exists")
    }
  }, 3000);
}


const GetAllUserHandler = ()=>{
  let visibility = document.querySelector(".admin_view_users").style.display;
  if(visibility === "block" ){
   document.querySelector(".admin_view_users").style.display="none"
  }
  else{
   document.querySelector(".admin_view_users").style.display="block";
   document.querySelector(".admin_view_crawler").style.display="none";
   document.querySelector(".adim_view_memberships").style.display="none";
  }
}
const GetCrawlerHandler = ()=>{
  let visibility = document.querySelector(".admin_view_crawler").style.display;
  if(visibility === "block"){
    document.querySelector(".admin_view_crawler").style.display="none";
  }
  else{
    document.querySelector(".admin_view_crawler").style.display="block";
    document.querySelector(".admin_view_users").style.display="none";
    document.querySelector(".adim_view_memberships").style.display="none";
  }
}
const GetMembershipsHandler=()=>{
  let visibility = document.querySelector(".adim_view_memberships").style.display;
  if(visibility === "block"){
    document.querySelector(".adim_view_memberships").style.display="none";
  }
  else{
    document.querySelector(".adim_view_memberships").style.display="block";
    document.querySelector(".admin_view_users").style.display="none";
    document.querySelector(".admin_view_crawler").style.display="none";
  }
}
  return (
    <div className="admin_main_container">

      <div className="admin_parent_container">
        <div className="admin_section_container">
          <div className="admin_section_users">
            <button onClick={GetAllUserHandler}>Users</button>
          </div>
          <div className="admin_section_crawl">
            <button onClick={GetCrawlerHandler}>Crawl</button>
          </div>
          <div className="admin_section_memberships">
            <button onClick={GetMembershipsHandler}>Memberships</button>
          </div>
        </div>
        <div className="admin_view_container">
          
       <div className="admin_view_users">
       {data.users && data.users.length > 0 && (
          <table >
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>UserName</th>
              
            </tr>
                  {data.users.map((result,index)=>{
                    return <tr key={index}>
                      <td>{result.name}</td>
                      <td>{result.email}</td>
                      <td>{result.username}</td>
                      
                    </tr>
                  })}
          </table>
        )}
       </div>
       <div className="admin_view_crawler">
        <input type="text" value={URL} onChange={(e)=>{setURL(e.target.value)}}/>
        <button onClick={urlSubmitHandler}>Crawl</button>
       </div>
       <div className="adim_view_memberships">
        <div className="add_memberships">
        <p>Membership name:        </p>   <input type="text" value={membershipName}onChange={(e)=>{setMembershipName(e.target.value)}}required/>
     <p>Membership price:       </p>   <input type="number"value={membershipPrice} onChange={(e)=>{setMembershipPrice(e.target.value)}}required/>
     <p>Membership description: </p>   <input type="text" value={membershipDescription} onChange={(e)=>{setMembershipDescription(e.target.value)}}/>
     <button onClick={membershipAddHandler}>Submit</button>
        </div>
        <div className="view_memberships">
          {memberships && memberships.length >0 && (<table>
            <tr>
              <th>Name</th>
              <th>price</th>
              <th>description</th>
            </tr>
            {memberships.map((element,index)=>{
             return <tr key={index}>
                <td>{element.membership_name}</td>
                <td>{element.membership_price}</td>
                <td>{element.membership_description}</td>
              </tr>

              
            })}
          </table>)}
        </div>
       </div>
        </div>
      </div>
    </div>
  )
}

export default Admin