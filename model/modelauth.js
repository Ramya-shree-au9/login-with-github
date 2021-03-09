

// it is a Schema

var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
})

//mongoose.model('collection','schema')
mongoose.model('jwtuser',UserSchema)
module.exports= mongoose.model('jwtuser')