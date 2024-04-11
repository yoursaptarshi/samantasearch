const mongoose = require ('mongoose')

const membershipSchema = mongoose.Schema({
    membership_name:{
        type:String,
        
    },
    membership_price:{
        type:Number,
        
    },
    membership_description:{
        type:String
    }
})

module.exports = mongoose.model('memberships',membershipSchema)