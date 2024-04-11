//const User = require("../models/User");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const {token} = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.isAdmin = async (req,res,next)=>{
  try {
    const {token} = req.cookies;
    if(!token){
      res.status(400).json({
        success:false,
        message:"Login First!"
      })
    };
    const decoded = await jwt.verify(token,process.env.JWT_SECRET);
   let user =await User.findById(decoded._id);
    let isAdmin=  user.isadmin;

    if(isAdmin){
      next();
    }
    else{
      res.status(400).json({
        success:false,
        message:"You are not admin!"
      })
    }
  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message
    })
  }
}

