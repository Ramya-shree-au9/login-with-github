import React,{useState} from 'react'
import axios from 'axios'
import './style.css'
import {Link} from 'react-router-dom'

const Registerform = (props) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [psw,setPsw] = useState('')
    const [err,setErr] = useState('')

    const nameRender=(e)=>{
        setName(e.target.value)
    }
    const emailRender=(e)=>{
        setEmail(e.target.value)
    }
    const pswRender=(e)=>{
        setPsw(e.target.value)
    }
   
    const submitForm=(e)=>{
        console.log('submit')
        e.preventDefault() 
        axios.post('http://localhost:5000/api/auth/register',{
            name:name,
            email:email,
            password:psw
        }).then((data)=>{
          console.log(data)
          if(data.data.data ==='err'){
            setErr('Email already exist')
          }else{
            props.history.push('/')
          } 
        }
        )
        
        .catch=(err)=>{
            console.log('err')
        }    
    }
    // console.log(props)
  return (
      <div class='container'>
    <div class="row mt-5 pt-5" >
		<div class="col-md-3">
			<div class="contact-info">
				<img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
				<h2>Register Here</h2>
				<h4>We would love to hear from you !</h4>
			</div>
		</div>
		<div class="col-md-9">
			<form class="contact-form">
				<div class="form-group">
				  <label class="control-label col-sm-2" for="fname">Name:</label>
				  <div class="col-sm-10">          
					<input type="text" class="form-control" id="fname" placeholder="Enter  Name" onChange={nameRender} name="name"/>
				  </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email:</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" id="email" placeholder="Enter email" onChange={emailRender} name="email"/>
                    </div>
                  </div>
				<div class="form-group">
				  <label class="control-label col-sm-2"  for="place">Password:</label>
				  <div class="col-sm-10">          
					<input type="password" class="form-control" id="place" placeholder="Enter Place" onChange={pswRender} name="password"/>
				  </div>
				</div>
        <span>{err}</span>
				<div class="form-group">        
				  <div class="col-sm-offset-2 col-sm-10">
					<button type="submit" class="btn btn-default" onClick={submitForm}>Register</button>
                    <span>All ready user</span><Link to='/'>Login</Link>
				  </div>
                  
                
				</div>
                
			</form>
		</div>
	</div>
    </div>
  )
}

export default Registerform
