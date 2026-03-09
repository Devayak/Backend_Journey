import React from 'react'
import {Link} from 'react-router'
import {useNavigate} from 'react-router'

export const Home = () => {
    const navigate=useNavigate()
  return (
    <div>
        <h1>home</h1>
        {/* <Link to="/login">login</Link> */}
        <button onClick={()=>navigate("/login")}>Login</button>
    </div>
  )
}
