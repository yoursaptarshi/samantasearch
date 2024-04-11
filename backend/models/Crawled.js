const mongoose = require("mongoose")

const crawledSchema = new mongoose.Schema({
    url:{
        type:String
    },
    titles:{
        type:String
    },
    
})

module.exports = mongoose.model("Crawled",crawledSchema);