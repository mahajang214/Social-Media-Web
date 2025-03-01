import { create } from 'zustand';
import { io } from 'socket.io-client'
import userStore from './userStore';

const SERVER_URL=`${import.meta.env.VITE_URL}`

// const {from,to}=userStore();

const socketStore = create((set, get) => ({
    socket: null, // Socket.io client instance
    messages: [], // Store chat messages
    // isConnected: false, // Connection status

    // Initialize socket connection
    initSocket: () => {
        const socket = io(SERVER_URL,{withCredentials:true});

        // When connected to the server
        // socket.on('connect', () => {
        //     console.log('Connected to server');
        //     set({ isConnected: true });
        // });

        // When receiving a new message
        socket.on('newMessage', (message) => {
            set((state) => ({
                messages: [...state.messages, message],
            }));
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            // set({ isConnected: false });
        });

        set({ socket });
    },

    // Send a message through the socket
    sendMessage: (message) => {
        const socket = useChatStore.getState().socket;
        if (socket && message) {
            socket.emit('sendMessage', message); // Emit to server
            set((state) => ({
                messages: [...state.messages, { text: message }],
            }));
        }
    },

    // Clean up socket when unmounting the app
    disconnectSocket: () => {
        const socket = useChatStore.getState().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null });
        }
    },
}));

export default socketStore;