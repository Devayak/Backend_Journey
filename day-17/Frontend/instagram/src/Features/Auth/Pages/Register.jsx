import React from "react";
import { Link } from "react-router";
import "../style/register.scss";
import { useState } from "react";

import { useNavigate } from "react-router";



import axios from "axios"
const Register = () => {

    // const [form,setForm]=useState({
    //     email:"",
    //     username:"",
    //     password:""
    // })


    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    // const [data,setData]=useState("")

    // const handleInput=(e)=>{

    //     const{name,value}=e.target;
    //    setForm({...form,[name]:value})


    // }
const navigate=useNavigate();



   async function handleSubmit(e){
    e.preventDefault();
    console.log('form submitted');
   try{
    const res=await  axios.post("http://localhost:3000/api/auth/register",{
        email,
        username,
        password
    },
{withCredentials:true})
    
   console.log(res.data);
   setEmail("") 
setUsername("")
setPassword("")    

navigate("/login")
  
        
} catch (err) {
    console.log(err.response?.data || err.message);
  }
console.log('heelo');



   


  



    // setForm({
    //   email: "",
    //   name: "",
    //   img_url: "",
    //   possition: "",
    // });
  };
  
//    useEffect(()=>{
//     localStorage.setItem("allYsers",JSON.stringify(data))

//   },[data])

  return (
    <div className="register">
      <h3>Get started on Instagram</h3>
      <h4>Sign up to see photos and videos from your friends.</h4>

      <form onSubmit={handleSubmit}>
        <label> email</label>
        <input type="text" placeholder="email "  required onInput={(e)=>{setEmail(e.target.value)}}/>
         <label>Username</label>
        <input type="text" placeholder="username" required onInput={(e)=>{setUsername(e.target.value)}} />
        <label>Password</label>
        <input type="password" placeholder="password" req onInput={(e)=>{setPassword(e.target.value)}}/>
       
        <button type="submit">Submit</button>
        
        {/* <Link to="/login" className="rstBtn">Submit</Link> */}
        <Link to="/login">Already have an account</Link>
      </form>
    </div>
  );
};

export default Register;
