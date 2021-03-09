import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Header from './header'
import Login from './Login'
import Register from './Register'
import Forgotpsw from './forgotpsw'

const Routing = ()=>{
    return(
        <BrowserRouter>
        <Header/>
        <Route exact path='/' component={Login}/>
        <Route exact path='/register' component={Register}/>       
        <Route exact path='/pswSet' component={Forgotpsw}/>       
        </BrowserRouter>
    )
}

export default Routing