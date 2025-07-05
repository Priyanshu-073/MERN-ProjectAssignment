const mongoose = require("mongoose")

const url = ''

const connection = async () =>{
    return mongoose.connect(url)
}

module.exports = connection;