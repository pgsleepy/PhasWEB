import { useEffect, useState } from "react";

import socket from "@/Components/Socket";

export default function OnlineUsers() {
  const [onlineUsersCount, setOnlineUsersCount] = useState(Number);
  //console.log(`UseEffect! ${window.location.host}`);

  useEffect(() => {
    socket.emit("getPlayersOnline");
    //* Listen for conneect events from the server
    socket.on("getPlayersOnline", (count) => {
      setOnlineUsersCount(count);
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("getPlayersOnline");
    };
  }, []);

  return (
    <>
      <small>Users online: {onlineUsersCount}</small>
    </>
  );
}
