import { io } from "socket.io-client";

const URL = "http://localhost:4000";

const socket = io(URL, { transports: ["websocket"] })









const user = JSON.parse(localStorage.getItem('user'))





socket.on("connect", () => {
    if (user && socket) {
       

        socket.emit("login", { id: socket.id, userId: user._id })
        
    }
    
});

socket.on("connect_error", (err) => {
    
    console.log(`connect_error due to ${err}`);
});


export default socket;

