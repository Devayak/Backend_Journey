import React from "react";
import { Link } from "react-router";

import "../style/form.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


const Login = () => {

  const navigate=useNavigate()

    const[username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit=async(e) => {
        e.preventDefault()
        console.log('login done!');
        const res= await axios.post("http://localhost:3000/api/auth/login",{
            username,
            password
        },
    {withCredentials:true})
        console.log(res.data);
        navigate("/home")
        
    }
  return (
    <div className="main">
      <div className="left">
        <div className="text">
          <h2>See everyday moments from</h2>
          <h2 className="secondLine">
            your <span>close friends.</span>
          </h2>
        </div>
        <img
          src="https://static.cdninstagram.com/rsrc.php/v4/yF/r/reN9rvYdLTB.png"
          alt=""
        />
      </div>
      <div className="right">
        <h1>Log into Instagram</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}} />
          <input type="text" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
          <button>Log in</button>
          
        </form>
        <p>Dont't Have an Account <Link to='/register'>create an Account</Link>  </p>
      </div>
    </div>
  );
};

export default Login;
