import io from "socket.io-client";
const socket = io("https://ws.rl-elo.com", { transports: ["polling"] });
export default socket;
