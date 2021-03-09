var express = require('express')
var router = express.Router()
var bodyparser = require('body-parser')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var config = require('../config')
var user = require('../model/modelauth')

router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json())

//getAll users
router.get('/users',(req,res)=>{
    user.find({},(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

//register
router.post('/register',(req,res)=>{
    // console.log("jjk", res.body)
    var hashpassword = bcrypt.hashSync(req.body.password,8)
    user.findOne({email:req.body.email},(err,data)=>{
        try{
            if(data){
                res.json({"data":"err"})
            }
            else{
                user.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:hashpassword,
                    role:req.body.role?req.body.role:'user'
                },(err,user)=>{
                    try{
                        res.status(200).json({"data":user})  
                    }
                    catch{
                        res.status(400).json({"data":err})  
                    }
            })
        }}
        catch{
            res.status(400).json({"data":err})  
        }
    })
})
       
        // if(err) throw err
        // res.status(200).send('Register success',user)  
 

// loginuser
router.post('/login',(req,res)=>{
    user.findOne({email:req.body.email},(err,data)=>{
        try{
            if(err || !data || !bcrypt.compareSync(req.body.password, data.password)){
                res.json({"data":"err"})    
            }else{
                var token = jwt.sign({id:data._id},config.secrete,{expiresIn:86400})
                res.json({auth:true,token:token,data:data})
            }
        }
        catch{
            res.json(err)
        }
    //     if(err) return res.status(500).send({auth:false, 'error':"error while login"})
    //     if(!data) return res.status(500).send({auth:false, 'error':'No user found register'})
    //     else{
    //         const passIsValid = bcrypt.compareSync(req.body.password, data.password)
    //         if(!passIsValid) return res.status(500).send({"error":'invalid password'})
    //         //here we are generating token
    //         //userid,secert,expiretime
    //         var token = jwt.sign({id:data._id},config.secrete,{expiresIn:86400})
    //         res.send({auth:true,token:token})
    //     }
    })
})

router.patch('/forPsw',(req,res)=>{
    console.log(req.body)
    var hashpassword = bcrypt.hashSync(req.body.password,8)
    user.findOne({email:req.body.email},(err,data)=>{
        try{
            if(err || !data){
                res.json({"data":"err"})    
            }else{
                user.findByIdAndUpdate(data._id,{password:hashpassword},{new: true},(err,data)=>{
                    var token = jwt.sign({id:data._id},config.secrete,{expiresIn:86400})
                    res.json({auth:true,token:token,data:data})
                })    
            }
        }
        catch{
            res.json(err)
        }
    })
})
//userinfo
router.get('/userinfo',(req,res)=>{
    var token = req.headers['x-access-token']
    if(!token) res.send({auth:false,token:'No token provided'})
    jwt.verify(token,config.secrete,(err,data)=>{
        if(err) return res.status(500).send({auth:false,'error':'Invalid Token'})
        user.findById(data.id,{password:0},(err,result)=>{
            res.send(result)
        })
    })
})

module.exports=router
