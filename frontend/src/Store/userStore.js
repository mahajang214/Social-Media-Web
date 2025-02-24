import { create } from "zustand";
import authStore from "./authStore";

// const {  setAuth } = authStore();
const userStore = create((set) => ({
    fromName: null,
    setFromName:(e)=>set({ fromName:e}),
    setUser: (user) => set({ user: user }),
    from: null,
    setFrom: (from) => set({ from: from }),
    to: null,
    toName:null,
    setToName:(e)=>set({toName:e}),
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
load:false,
setLoad:(e)=>set({load:e})
}))

export default userStore;