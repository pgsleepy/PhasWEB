import io from "socket.io-client";
const socket = io("http://ws.rl-elo.com");
export default socket;
