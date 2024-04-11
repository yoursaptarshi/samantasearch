import axios from "axios";

export const loginUser = (username,password)=>async(dispatch)=>{
try{
dispatch({
    type:"LoginRequest",
});

const {data}=await axios.post("/api/v1/signin",{username,password}
);
dispatch({
    type:"LoginSuccess",
    payload:data.user,
})
}
catch(error){
    dispatch({
        type:"LoginFailure",
        payload:error.response.data.message,
    });

}
};

export const registerUser = (name,username,email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:"RegisterRequest",
        });
        const {data}= await axios.post("/api/v1/register",{name,username,email,password});
        dispatch({
            type:"RegisterSuccess",
            payload:data.user,
        })
    }
    catch(error){
        dispatch({
            type:"RegisterFailure",
            payload:error.response.data.message
        })
    }
};

export const loadUser =()=> async(dispatch)=>{
    try{
        dispatch({
            type:"LoadUserRequest",
        })
        const {data} = await axios.get("/api/v1/me");
    
        dispatch({
            type:"LoadUserSuccess",
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message
        })
    }
}

export const logout=()=>async(dispatch)=>{
    try {
         await axios.get("/api/v1/logout");

        dispatch({
            type:"LogoutUserSuccess",
            
        })
    } catch (error) {
        dispatch({
            type:"LogoutUserFailure",
            payload:error.response.data.message
        })
    }
}
export const updateName =(name)=>async(dispatch)=>{
try {
    dispatch({
        type:"UpdateNameRequest"
    })
    const {data} = await axios.post("/api/v1/update/name",{newName:name});
    dispatch({
        type:"UpdateNameSuccess",
        payload:data.user
    })
    
} catch (error) {
    dispatch({
        type:"UpdateNameFailure",
        payload:error.response.data.message
    })
}
}


export const updateuserName = (username) => async(dispatch)=>{
    try {
        dispatch({
            type:"UpdateuserNameRequest"
        })
        const {user} = await axios.post("/api/v1/update/username",{username})
        dispatch({
            type:"UpdateuserNameSuccess",
            payload:user.data
        })
        
    } catch (error) {
        dispatch({
            type:"updateuserNameFailure",
            payload:error.response.data.message
        })
    }
}

export const uploadPhoto = (image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UploadPhotorequest"
        })
        const formData = new FormData();
        formData.append('user_photo', image);
       const {data} = await axios.post("/api/v1/upload",formData
    )
        dispatch({
            type:"UploadPhotoSuccess",
            payload:data
        })
    } catch (error) {
        dispatch({
            type:"UploadPhotoFailed",
            payload:error.response.data.message
        })
    }
}


//admin actions



export const adminuser=()=>async(dispatch)=>{
    try {

        dispatch({
            type:"AdminUserRequest"
        })
        const {data} = await axios.get("/api/v1/me");
        dispatch({
            type:"AdminUserSuccess",
            payload:data.user.isadmin
        })
        
    } catch (error) {
        dispatch({
            type:"AdminUserFailure",
            payload:error.response.data.message
        })
    }
}


export const getallusers=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetAllUserRequest"
        })
        const {data} = await axios.get("/api/v1/allusers")
        dispatch({
            type:"GetAllUserSuccess",
            payload:data.users
        })
        
    } catch (error) {
        dispatch({
            type:"GetAllUserFailure",
            payload:error.response.data.message
        })
    }
}