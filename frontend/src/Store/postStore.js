import {create} from 'zustand';




const postStore=create((set)=>({
    postId:"",
    setPostId:(id)=>set({postId:id}),

}))
export default postStore