const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//The unique option tells Mongoose that each document must have a unique value for a given path. For example, below is how you can tell Mongoose that a user's email must be unique.
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"Please enter your name"]
},
username:{
type:String,
required:[true,"Enter a unique username"],
unique:[true,"Username already exists"]
},
email:{
    type:String,
    required:[true,"Please Enter Your Email Id"],
    unique:[true,"Email Id already exists"]
},
gender:{
    type:String,
    default:"Male"
},
dob:{
    type:Date,
    default:Date.now
},
password:{
    type:String,
    required:[true,"Enter your password"],
    minlength:[3,"password must be atleast 4 characters"]
},
isadmin:{
    type:Boolean,
    default:false
},
membership:{
    type:"String",
    default:"none"
}
} 
);

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}



//mongoose.model('collection name',collection schema)

module.exports= mongoose.model('User',userSchema);