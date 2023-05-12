import { SetStateAction, useState } from "react";
import { EvidenceItem, Ghosts } from "@/types";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import socket from "@/Components/Socket";

import ghost from "@/data/ghosts.json";
import evidences from "@/data/evidences.json";
import Link from "next/link";
import Footer from "@/Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleArrows, faPlay } from "@fortawesome/free-solid-svg-icons";

const evidence: EvidenceItem = evidences;
const ghosts: Ghosts[] = ghost;

export default function Setupshared() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

  const handleRoomChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRoom(event.target.value);
  };

  const handleJoinLobby = () => {
    //* Check if data is correct.
    if (!name) return errorToast("Name cannot be empty!");

    if (!room) {
      return setRoom(
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")
      );
    }

    if (name.length > 23)
      return errorToast(`Name cannot exceed 24 characters.`);

    if (room.length > 23)
      return errorToast(`Room cannot exceed 24 characters.`);

    if (name.length < 4)
      return errorToast(`Name cannot be below 4 characters.`);

    if (room.length < 4)
      return errorToast(`Room cannot be below 4 characters.`);

    //? Try and connect
    const tryConnect = new Promise((resolve, reject) => {
      socket.emit("requestJoin", { room, name });

      console.log("Listening...");
      //* Listen for appointLeader events from the server
      socket.on("allowedRoom", (data) => {
        const roomID = data["roomID"];
        const oneTimeCode = data["oneTimeCode"];
        const customID = data["customID"];
        resolve(redirectRoom(roomID, oneTimeCode, customID));
      });

      socket.on("deniedRoom", () => {
        reject("Not allowed..");
      });

      setTimeout(() => {
        reject("Timed out!");
      }, 30000);

      //* Cleanup function to remove the event listener when the component unmounts
      return () => {
        socket.off("allowedRoom");
      };
    });

    const redirectRoom = (
      roomID: string,
      oneTimeCode: string,
      customID: string
    ) => {
      console.log("Allowed!");
      setInterval(() => {
        window.location.replace(
          `/shared-evidence?roomID=${roomID}&oneTimeCode=${oneTimeCode}&playerName=${name}&customID=${customID}`
        );
      }, 2000);
    };

    toast.promise(tryConnect, {
      pending: "Awaiting permission to join room...",
      success: "Allowed to enter room!",
      error: "Not allowed to enter room!",
    });
  };

  const errorToast = (message: string) => {
    toast.error(message, {
      position: "bottom-left",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <title>Shared Evidence - PhasWEB</title>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        className="z-50"
      />
      <div className="flex h-screen">
        <div className="hero-overlay bg-opacity-60 absolute"></div>
        <div className="card w-100 m-auto bg-base-100 max-w-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center">
              How would you like to use Shared Journal?
            </h2>
            <p className="text-xs">
              You can use Shared Journal with your friends or you can use the
              journal for singleplayer!
            </p>
            <div className="divider mt-0 mb-0" />
            <div className="flex flex-row">
              <div className="card bg-base-200 w-100 max-h-36 p-5 m-auto">
                <div className="text-2xl">Singleplayer</div>
                <div className="pt-5 card-actions justify-center">
                  <Link href="/shared-evidence">
                    <button className="btn btn-outline btn-success m-auto">
                      <FontAwesomeIcon
                        style={{
                          height: "1.5rem",
                          width: "1.5rem",
                          marginRight: "5px",
                        }}
                        icon={faPlay}
                      />
                      Start playing!
                    </button>
                  </Link>
                </div>
              </div>
              <div className="divider divider-horizontal m-auto"></div>
              <div className="card bg-base-200 p-5">
                <div className="text-2xl">Multiplayer</div>
                <div className="form-control m-auto">
                  <label className="label text-center justify-center">
                    <span className="label-text">What is your name?</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered m-auto text-center"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>

                <div className="form-control m-auto">
                  <label className="label text-center justify-center">
                    <span className="label-text">
                      What room do you want to join?
                    </span>
                  </label>
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip="Leave empty to generate automatically"
                  >
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered m-auto text-center"
                      value={room}
                      onChange={handleRoomChange}
                    />
                  </div>
                </div>
                <div className="card-actions justify-center pt-5">
                  <button
                    className="btn btn-outline btn-success"
                    onClick={handleJoinLobby}
                  >
                    <FontAwesomeIcon
                      style={{
                        height: "1.5rem",
                        width: "1.5rem",
                        marginRight: "5px",
                      }}
                      icon={faPeopleArrows}
                    />
                    CREATE OR JOIN LOBBY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
