var express  =require('express')
var app = express()
var db = require('./db')

var cors = require('cors')
app.use(cors())

const authController = require('./controller/authcontroller')
app.use('/api/auth',authController)


if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/react/build")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}else{
    app.get("/",(req,res)=>{
        res.send("api is running")
    })
}
var port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})