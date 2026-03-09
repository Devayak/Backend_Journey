import { getFeed, createPost, likePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { postContext } from "../post.context";
//hyderation of post context-field data from backend and function to create post and get feed

export const usePost = () => {
  const context = useContext(postContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const response = await getFeed();
    console.log(response);
    setFeed(response.post);
    setLoading(false);
  };

  const handleCreatePost = async (ImgFile, caption) => {
    setLoading(true);
    const response = await createPost(ImgFile, caption);
    console.log(response);
    setFeed([response.post, ...feed]);
    setLoading(false);
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  const handleLikePost = async (postId, username) => {
    setLoading(true)
    const data=await likePost(postId, username);
    setLoading(false)
    // setFeed(
    //   feed.map((post) => {
    //     if (post._id === postId) {
    //       return {
    //         ...post,
    //         isLiked: !post.isLiked,
    //         countLike: post.isLiked ? post.countLike - 1 : post.countLike + 1,
    //       };
    //     }
    //     return post;
    //   })
    // );
  };

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
  };
};
