import React, { useState } from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router'
import {useAuth} from "../Hook/useAuth"


const Login = () => {
  const{loading,handleLogin}=useAuth()
  const [userName,setUserName]=useState("")
  const [password,setPassword]=useState("")

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await handleLogin(userName,password)
    console.log('user loggedIn');
    navigate('/')
    
    
  }

  if(loading){
    return(
      <main>
        <h1>loading...</h1>
      </main>    )
  }
  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input onInput={(e)=>{setUserName(e.target.value)}} type="text" placeholder='username' id='username'/>
          <input onInput={(e)=>{setPassword(e.target.value)}}  type="password" placeholder='password' id='password'/>
          <button type='submit' className='button primary-btn'>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login