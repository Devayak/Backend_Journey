import React, { useState } from "react";
import "../Style/feed.scss";

const Post = ({ user, post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const[like,setLike]=useState(post.countLike)
  console.log(isLiked);

  const handleClicked = () => {
    if(like===post.countLike){
      setLike(like+1)
    } else{
      setLike(like-1)
    } 
    setIsLiked(!isLiked);

  };
  console.log(isLiked);

  return (
    <div className="post">
      {/* Header */}
      <div className="post-header">
        <div className="user">
          <img src={user.profileImage} />
          {console.log(user.profileImage)}
          <span>{user.username}</span>
        </div>

        <div className="more">•••</div>
      </div>

      {/* Post Image */}
      <div className="post-image">
        <img src={post.imgUrl} />
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="left">
          <button
            onClick={() => {
              handleClicked();
            }}
          >
            <i className={`ri-heart-line myIcon ${isLiked ? "like" : ""}`}></i>
          </button>
          <i className="ri-chat-1-line myIcon"></i>
          <i className="ri-send-ins-fill myIcon"></i>
        </div>

        <div className="right">
          <i className="ri-chat-download-line myIcon"></i>
        </div>
      </div>

      {/* Likes */}
      <div className="likes">{like}</div>

      {/* Caption */}
      <div className="caption">{post.caption}</div>

      {/* Time */}
      <div className="time">2 hours ago</div>
    </div>
  );
};

export default Post;
