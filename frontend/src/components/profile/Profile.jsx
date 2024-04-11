import React from 'react'
import "./profile.css"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateName,updateuserName,uploadPhoto } from '../../Actions/user'


const Profile = () => {
    const dispatch = useDispatch();

    
    let { user } = useSelector((state) => state.user);
    let photo_address = user?(`${user._id}.jpg`):("user_logo");

    const [name, setName] = useState(user?(user.name):("Loading"));
    const [username, setuserName] = useState(user?(user.username):("Loading"));
    const [email, setEmail] = useState(user?(user.email):("Loading"));
    const [image,setImage]=useState('')
    const plan = user?(user.membership):("loading")
    const saveNameHandler = () => {
        dispatch(updateName(name));
    }
   
    const saveuserNameHandler = () => {
        dispatch(updateuserName(username));
    }
    const saveProfilephotoHandler=()=>{
        const formData = new FormData();
    formData.append('user_photo', image);
        dispatch(uploadPhoto(image))
    }
    let profile_photo_address = require(`../images/userImages/user_logo.png`)
    try {
         profile_photo_address = require(`../images/userImages/${photo_address}`)
    } catch (error) {
         profile_photo_address = require(`../images/userImages/user_logo.png`)
    }
    return (
        <div className="profile_main">
            
            <div className="profile_parent">
                <div className="profile_page_profile_components">
                    <div className="profile_image">
                    <img src={profile_photo_address} alt="user photo"/>
                    <div className="input_image_box">
                    
                        <input type="file" id="profile_photo_input" onChange={(e)=>{setImage(e.target.files[0])}}/>;
                        
                    </div>
                    <div className="image_save_button">
                        <button id="profile_photo_save_button" onClick={saveProfilephotoHandler}>Save</button>
                    </div>
                    </div>
                    <div className="profile_name_wrapper">
                        
                        <div className="profle_name_input">
                            <div className="text">
                                <p>Name :</p>
                            </div>
                            <div className="input_box">
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                        </div>
                        <div className="profile_name_button">
                            <button id="profile_name_save_button" onClick={saveNameHandler}>Save</button>
                        </div>
                    </div>
                    <div className="profile_username_wrapper">
                        
                        <div className="profle_username_input">
                            <div className="text">
                                <p>UserName :</p>
                            </div>
                            <div className="input_box">
                            <input type="text" value={username} onChange={(e) => { setuserName(e.target.value) }} />
                            </div>
                        </div>
                        <div className="profile_username_button">
                            
                            <button id="profile_username_save_button" onClick={saveuserNameHandler}>Save</button>
                        </div>
                    </div>
                    <div className="profile_email_wrapper">
                        
                        <div className="profle_email_input">
                            <div className="text">
                                <p>Email :</p>
                            </div>
                            <div className="input_box">
                            <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>
                        <div className="profile_email_button">
                            
                            <button id="profile_email_save_button" onClick={saveuserNameHandler}>Save</button>
                        </div>
                    </div>
                    <div className="profile_plan_wrapper">
                        <div className="text">
                            <p>Your Plan:</p>
                        </div>
                        <div className="input_box">
                        <input type="text" value={plan}  />
                        </div>
                        <div className="plan_upgrade__button">
                            <a href="/plans"><button>Upgrade</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile