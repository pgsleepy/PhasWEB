import { useEffect, useState } from "react";

import Socket from "@/Components/Socket";

export default function OnlineUsers() {
  const [onlineUsersCount, setOnlineUsersCount] = useState(Number);
  //console.log(`UseEffect! ${window.location.host}`);
  useEffect(() => {
    fetch("https://phas-web.vercel.app/api/users")
      .then((res) => res.json())
      .then((data) => {
        setOnlineUsersCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });

    setInterval(() => {
      fetch("https://phas-web.vercel.app/api/users")
        .then((res) => res.json())
        .then((data) => {
          setOnlineUsersCount(data.count);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 10000);
  }, []);

  return (
    <>
      <small>Users online: {onlineUsersCount}</small>
    </>
  );
}
