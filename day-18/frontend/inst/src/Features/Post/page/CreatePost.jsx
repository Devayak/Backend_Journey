import React, { useRef, useState } from 'react'
import"../Style/createPost.scss"
import { usePost } from '../Hook/usePost'
import {useNavigate} from "react-router"
const CreatePost = () => {

 const [caption,setCaption]=useState("")
        const imgRef=useRef(null)

        const{loading,handleCreatePost}=usePost()

        const navigate=useNavigate()


    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log('creating post');
        const file=imgRef.current.files[0]

       await handleCreatePost(file,caption)
       navigate("/")

    }

    if(loading){
        return(<h1>creating post</h1>)
    }
  return (
    <div className='createPost'>
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="imgUrl">image file</label>
            <input ref={imgRef} type="file" name='imgUrl' accept='image/*'  />
            <label >caption</label>
            <input type="text" name='caption' value={caption} onChange={(e)=>
                {setCaption(e.target.value)}}/>
            <button type='submit'>Create Post</button>
        </form>
    </div>
  )
}

export default CreatePost