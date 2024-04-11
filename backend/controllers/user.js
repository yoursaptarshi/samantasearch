const User = require("../models/User")
const multer = require("multer")
const path = require('path');
exports.register = async(req,res)=>{
    try{
        const {name,username,email,password} =req.body;

        let user = await User.findOne({username:username});
        
        if(user){
           return res.status(400).json({
            success:false,
            message:"User already exists",
            user:user
        });
        }
        else{
         const  user =  await User.create({
                name,
                username,
                email,
                password
            });
           const token = await user.generateToken();
            res.status(200).cookie("token",token,{expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true,}).json({
                    success:true,
                    message:"user created",
                    token:token,
                    user:user
                });
            }     
        
    }
    catch(error){
        res
        .status(500)
        .json({
                success:false,
                message:error.message
            });
    }
}

exports.login = async(req,res) => {
    try{
        const {username,password}=req.body;
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        const token = await user.generateToken();
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Passwords no not match"
            })
        }
        else if(isMatch){
            res.status(200).cookie("token",token,{expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true,}).json({
                success:true,
                message:"Login in success",
                token:token,
            })
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.me =async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        
        res.status(200).json({
            success:true,
            user,
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.logout = async(req,res)=>{
    try {
       // const {token} = req.cookie;
        res.status(200).clearCookie('token').json({
            success:true,
            message:"LoggedOut successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateName = async(req,res)=>{
    try {

        const user = await User.findById(req.user._id);
        const {newName} = req.body;
        user.name=newName;
        await user.save();
        res.status(200).json({
            success:true,
            message:"Name Updated Successfully! ",
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateUsername = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        
        const {username} = req.body;
        let check = await User.find({username:username});
        if(check.length>0){
            res.status(400).json({
                success:false,
                message:"username already in use!",
                
            })
        }
        else{
            user.username=username;
            await user.save();
            res.status(200).json({
                
                success:true,
                message:"User name changed successfully",
                user:user

                
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.uploadPhoto=async(req,res)=>{
    try {
        const user_id =  req.user._id
        
        const storage= multer.diskStorage({
            destination:(req,res,cb)=>{
                cb(null,path.join(__dirname, "../../frontend/src/components/images/userImages"));
            },
            filename:(req,res,cb)=>{
                cb(null,user_id.toString()+".jpg")
            }
        })
      const upload =  multer({storage:storage}).single("user_photo")
      
        upload(req,res,(error)=>{
            if(error){
               return res.status(500).json({
                    success:false,
                     message:error.message,
                    
                })
            }
            if(!req.file){
              return  res.status(400).json({
                    success:false,
                    message:"File upload failed!"
                })
            }
            
              return  res.status(200).json({
                    success:true,
                    message:"File uploaded!"
                })
            }
        )
        
    } catch (error) {
        res.status(500).json({
            success:false,
             message:error.message,
            
        })
    }
}

//admin controllers




exports.allusers=async(req,res)=>{
    try {
        const usersData = await User.find();
        res.status(200).json({
            success:true,
            users:usersData
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//Notes:

// The req.body property contains key-value pairs of data submitted in the request body. By default, it is undefined and is populated when you use a middleware called body-parsing such as express.urlencoded() or express.json().

