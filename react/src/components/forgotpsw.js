import React,{useState} from 'react'
import axios from 'axios'
import './style.css'
import {Link} from 'react-router-dom'

const Forgotpsw = (props) => {
    const [email,setEmail]=useState(sessionStorage.getItem("email"))
    const [psw,setPsw] = useState('')
    const [conPsw,setConPsw] = useState("")
    const [err,setErr] = useState("")

    const emailRender=(e)=>{
        setEmail(e.target.value)
    }
    const pswRender=(e)=>{
        setPsw(e.target.value)
    }

    const conformPswRender=(e)=>{
        setConPsw(e.target.value)
        
    }
   
    const submitForm=(e)=>{
      e.preventDefault() 
      if(psw.length < 5){
        setErr("Password atleast 6 charector")
      }else{
      if(psw !== conPsw){
        setErr("Password does not match")
      } else if(email.length > 0){
        console.log('submit')
        axios.patch('http://localhost:5000/api/auth/forPsw',{
            email:email,
            password:psw
        }).then((data)=>{
          console.log(data)
          if(data.data.data === 'err'){
            setErr('Email not exit register again')
          }else{
            console.log(data.data.data)
            const obj = {username:data.data.data.name,
              role:data.data.data.role,
            token:data.data.token}
    
            sessionStorage.setItem('userDetail',JSON.stringify(obj))
            props.history.push('/')
          }}
        )    
    }}}
    // console.log(props)
  return (
      <div class='container'>
			<form class="contact-form" style={{marginTop:'80px'}}>
				
                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email:</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" id="email" placeholder="Enter email" defaultValue={email} onChange={emailRender} name="email"/>
                    </div>
                  </div>
				<div class="form-group">
				  <label class="control-label col-sm-2"  for="place">Password:</label>
				  <div class="col-sm-10">          
					<input type="password" class="form-control" id="place" placeholder="Enter Password" defaultValue={psw} onChange={pswRender} name="password"/>
				  </div>
				</div>

				<div class="form-group">
				  <label class="control-label col-sm-4"  for="place">Conform-Password:</label>
				  <div class="col-sm-10">          
					<input type="password" class="form-control" id="place" placeholder="Enter Conform Password" defaultValue={conPsw} onChange={conformPswRender} name="password"/>
				  </div>
				</div>
		
				
				<span>{err}</span>
				<div class="form-group">        
				  <div class="col-sm-offset-2 col-sm-10">
					<button type="submit" class="btn btn-default" onClick={submitForm} >Submit</button>
                    <span>New user</span><Link to='/register'>Register</Link>
                   <div><span>Allready user</span> <Link to='/'>Login</Link></div>
				  </div>
				</div>
                
			</form>
		</div>
  )
}

export default Forgotpsw
