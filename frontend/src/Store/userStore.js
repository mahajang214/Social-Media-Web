import { create } from "zustand";
import authStore from "./authStore";

// const {  setAuth } = authStore();
const userStore = create((set,get) => ({
    fromName: null,
    setFromName: (e) => set({ fromName: e }),
    setUser: (user) => set({ user: user }),
    from: null,
    setFrom: (from) => set({ from: from }),
    to: null,
    toName: null,
    setToName: (e) => set({ toName: e }),
    setTo: (to) => set({ to: to }),
    email: null,
    setEmail: (email) => set({ email: email }),
    follower: null,
    setFollower: (follower) => set({ follower: follower }),
    following: null,
    setFollowing: (following) => set({ following: following }),
    posts: null,
    setPosts: (posts) => set({ posts: posts }),
    logout: () => {

        set({ user: null });
        set({ from: null });
        set({ to: null });
        set({ email: null });
        set({ follower: null });
        set({ following: null });
        set({ posts: null });
        // setAuth(false);
    },
    load: false,
    setLoad: (e) => set({ load: e }),
    chat:true,
    setChat:(e)=>set({chat:e}),
//     onlineUsers: [],  // Initial empty array
//   setOnlineUsers: (newUser) => set((state) => {
//     // Add new user or update existing user in the array
//     // const {onlineUsers}=get();
//     const updatedUsers = [...state.onlineUsers];
//     updatedUsers.push(newUser);
    
//     // Check if the user already exists by userId
//     // const userIndex = updatedUsers.findIndex(user => user === newUser);
    
//     // if (userIndex !== -1) {
//         //   // If user exists, update the user at the index
//         //   updatedUsers[userIndex] = newUser;
//         // } else {
//             // If user does not exist, add the new user to the array
//             // for(let i=0;i<onlineUsers.length;i++){
//             //  if(state.onlineUsers[i]===state.onlineUsers[i+1]){
//             //      state.onlineUsers[i]="";
//             //  }
//             // }
//     // }

//     return { onlineUsers: updatedUsers };  // Return updated onlineUsers
//   }),
    // onlineUsers:[{}],
    // setOnlineUsers: (user) => set((state) => ({
    //     onlineUsers: { ...state.onlineUsers, [id] : user } // Adds or updates the user
    //   })),
    // setOnlineUsers: (newUser) => set((state) => ({
    //     onlineUsers: [...state.onlineUsers, newUser]  // Adds new user to the list
    //   })),
}))

export default userStore;