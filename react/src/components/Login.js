import React,{useState} from 'react'
import axios from 'axios'
import './style.css'
import {Link} from 'react-router-dom'

const Login = (props) => {
    const [email,setEmail]=useState('')
    const [psw,setPsw] = useState('')
    const [err,setErr] = useState('')

    const emailRender=(e)=>{
      sessionStorage.setItem('email',e.target.value)
        setEmail(e.target.value)
    }
    const pswRender=(e)=>{
        setPsw(e.target.value)
    }
   
    const submitForm=(e)=>{
        console.log('submit')
        e.preventDefault() 
        axios.post('http://localhost:5000/api/auth/login',{
            email:email,
            password:psw
        }).then((data)=>{
            console.log(data)
            if(data.data.data === 'err'){
              setErr('Email and password does not match try again')
            }else{
              console.log(data.data.data)
              const obj = {username:data.data.data.name,
                role:data.data.data.role,
              token:data.data.token}
      
              sessionStorage.setItem('userDetail',JSON.stringify(obj))
              props.history.push('/register')
            }}
          )    
    }
    // console.log(props)
  return (
      <div class='container'>
    <div class="row mt-5 pt-5">
		<div class="col-md-3">
			<div class="contact-info">
				<img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
				<h2>Login Here</h2>
				<h4>We would love to hear from you !</h4>
			</div>
		</div>
		<div class="col-md-9">
			<form class="contact-form">
				
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
					<button type="submit" class="btn btn-default" onClick={submitForm} >Login</button>
                    <span >New user</span><span style={{marginLeft:'5px'}}><Link to='/register'>Register</Link></span>
                    <div style={{marginLeft:'5px'}}><Link to='/pswSet'>Forgot password</Link></div>
				  </div>
				</div>
                
			</form>
		</div>
	</div>
    </div>
  )
}

export default Login
