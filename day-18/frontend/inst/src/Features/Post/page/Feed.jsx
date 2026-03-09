import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";

import {usePost} from "../Hook/usePost"
import Nav from "../../Shared/Component/Nav";



const Feed = () => {

    const{loading,feed,handleGetFeed,handleLikePost}=usePost()

    useEffect(()=>{
        handleGetFeed(),
        handleLikePost()
    },[])
    console.log("feed:",feed,"loading:",loading);

    if(loading || !feed){
        return (<main><h1>feed is loading</h1></main>)
    }
    

  return (
  <div>
 
    <Nav/>
      <div className="feed">
{[...feed].reverse().map((post)=>{
    return <Post key={post._id} post={post} user={post.user}/>
})}

    </div>
  </div>
  );
};

export default Feed;