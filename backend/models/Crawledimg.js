
const mongoose = require("mongoose")

const imageSchema = mongoose.Schema({
    url:{
        type:String,
        
    },
    alt:{
        type:String,
    }
})

module.exports = mongoose.model("Crawledimg",imageSchema)