import {create} from 'zustand';

// Define your store using Zustand's `create` function
const authStore = create((set) => ({
  authenticate: false,  // Initial state
  setAuth: (e) => set((state) => ({ authenticate: e })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
}));

export default authStore;