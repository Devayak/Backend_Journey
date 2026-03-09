import React from 'react'
import "./nav.scss"
import "../button.scss"
import { Link } from 'react-router'
import CreatePost from '../../Post/page/CreatePost'
const Nav= () => {

  return (
    
      <div className='navBar'>
        <h2>Instagram</h2>
        {/* <button className='button primary-btn'><Link to="/createpost">create post</Link></button> */}
        <button className="button primary-btn"><Link className="button primary-btn" to={"/createpost"}>create post</Link></button>
      </div>
    
  )
}

export default Nav