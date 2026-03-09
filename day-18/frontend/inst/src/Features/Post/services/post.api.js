import axios from "axios";


const Api_Url=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
})

export async function getFeed(){
    const response=await Api_Url.get("/api/posts/feed");
    return response.data
}

export async function createPost(ImgFile,caption) {
    const formData=new FormData()
    formData.append("image",ImgFile)
    formData.append("caption",caption)

    const response=await Api_Url.post("api/posts/",formData)

    return response.data
    
}

export async function likePost(postId,username){
    const response=await Api_Url.post(`/api/posts/postUser/${postId}/${username}`)
    return response.data
}