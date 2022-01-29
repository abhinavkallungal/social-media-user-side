import { io } from "socket.io-client";
const user = JSON.parse(localStorage.getItem('user'))


export let socket = io('http://localhost:4000', { transports: ['websocket', 'polling', 'flashsocket'] })


export let socketId = socket.id

socket.on("connect", () => {
    if (user && socket) {
     

        socket.emit("test", { id: socket.id, userId: user._id })

    }
    
});



