const mongoose = require("mongoose");

exports.connectDatabase = ()=>{
    mongoose
    .connect(process.env.Mongo_URI)
    .then((con)=>{console.log(`database created `,process.env.Mongo_URI)})
    .catch((err)=>{console.log(err)})
}