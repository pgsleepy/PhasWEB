import { useEffect, useState } from "react";

import Socket from "@/Components/Socket";

export default function OnlineUsers() {
  const [onlineUsersCount, setOnlineUsersCount] = useState(Number);
  //console.log(`UseEffect! ${window.location.host}`);
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setOnlineUsersCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });

    setInterval(() => {
      fetch("http://localhost:3000/api/users")
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
