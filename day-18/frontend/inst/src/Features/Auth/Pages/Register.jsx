import React, {  useState } from 'react'
import {useAuth} from "../Hook/useAuth"

import { Link, useNavigate } from 'react-router'


const Register = () => {


  const{handleRegister,loading}=useAuth()
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const[email,setemail]=useState("")
    const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log('registered..');
    console.log(username,password,email);
    await handleRegister(username,email,password)
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
          <h1>Register</h1>
          <input type="text" onInput={(e)=>{setusername(e.target.value)}}  placeholder='username' id='username'/>
          <input type="email" onInput={(e)=>{setemail(e.target.value)}}  placeholder='email' id='email'/>
          <input type="password"onInput={(e)=>{setpassword(e.target.value)}}   placeholder='password' id='password'/>
          <button type='submit' className='button primary-btn'>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register