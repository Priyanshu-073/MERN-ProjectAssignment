const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        required: true,
    }
})

const userModel = mongoose.model("User", userschema);
module.exports = userModel;