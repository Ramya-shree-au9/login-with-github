
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class header extends Component {
   
    
  render() {
    return (
      <nav class="navbar navbar-expand-md bg-danger navbar-dark fixed-top">
		
		<Link class="navbar-brand" >Developer Funnel</Link>
	  
		
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
		  <span class="navbar-toggler-icon"></span>
		</button>
	  	
		<div class="collapse navbar-collapse" id="collapsibleNavbar">
		  <ul class="navbar-nav">
			<li class="nav-item">
			  <Link class="nav-link" to="/">Login</Link>
			</li>
			<li class="nav-item">
			  <Link class="nav-link" to="/register">SignUp</Link>
			</li>
			
		  </ul>
		</div> 
      </nav>
    )
  }
}

export default header

