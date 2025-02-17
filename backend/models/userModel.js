const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : [true, "password is necessary"],
        },
    name : {
        type : String,
        required : [true, "name is required"],
        
    },
    lastLogin : {
        type : Date,
        default : Date.now
      
        
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    createdAt :{
        type : Date,
        default : Date.now
    },
    updatedAt :{
        type : Date,
        default : Date.now
    },
    resetpasswordToken : {type : String },
    resetpasswordTokenExpiresAt: {type : Date},
    verficationToken: {type : String},
    verificationTokenExpiresAt: {type : Date},

},
     {timestaps : true});




const User = new mongoose.model('User',userSchema)
module.exports = User;
