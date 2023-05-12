import { useEffect, useState } from "react";
import { EvidenceItem, Ghosts } from "@/types";

import { useRouter } from "next/router";

import socket from "@/Components/Socket";
import Footer from "@/Components/Footer";

import ghost from "@/data/ghosts.json";
import evidences from "@/data/evidences.json";
import EvidenceCard from "@/Components/EvidenceCard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OnlineUsers from "@/Components/OnlineUsers";

const evidence: EvidenceItem = evidences;
const ghosts: Ghosts[] = ghost;

export async function getServerSideProps(context?: any) {
  return { props: context?.query };
}

export default function Sharedevidence() {
  const router = useRouter();
  const queries = router.query;

  let heartbeatInterval;

  //* State variables
  const [collapsedGhosts, setCollapsedGhosts] = useState<{
    [key: string]: boolean;
  }>({});

  const [usersList, setUsersList] = useState({
    players: {
      names: [],
      sID: [],
    },
  });

  //? Connection variables
  const [connected, setConnected] = useState(Boolean);

  //? Request variables
  const [requestApprovalToast, setRequestApprovalToast] = useState(false);
  const [requestingUser, setRequestingUser] = useState<string[]>([]);

  //? Functionality variables
  const [selectedEvidences, setSelectedEvidences] = useState<string[]>([]);

  if (queries["roomID"]) {
    if (!connected) {
      socket.emit(
        "enterRoom",
        queries["oneTimeCode"],
        queries["roomID"],
        queries["playerName"],
        queries["customID"]
      );
    }
  }
  useEffect(() => {
    //* Listen for conneect events from the server
    socket.on("connect", () => {
      console.log("Connected to server!");

      heartbeatInterval = setInterval(() => {
        socket.emit("heartbeat", {
          customID: queries["customID"],
          roomID: queries["roomID"],
        });
      }, 5000);
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("connect");
    };
  });

  useEffect(() => {
    //* Listen for conneect events from the server
    socket.on("disconnect", () => {
      console.log("Disconnected from server!");
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("connect");
    };
  });

  useEffect(() => {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      socket.emit("leaveRoom", {
        cID: queries["customID"],
        roomID: queries["roomID"],
      });
    });
  });

  useEffect(() => {
    //* Listen for usersList events from the server
    socket.on("usersList", (data) => {
      setUsersList(data);
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("usersList");
    };
  });

  useEffect(() => {
    //* Listen for requestApproval events from the server
    socket.on("collapsedGhosts", (data) => {
      setCollapsedGhosts(data);
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("collapsedGhosts");
    };
  }, [socket]);

  useEffect(() => {
    //* Listen for requestApproval events from the server
    socket.on("requestApproval", (approval) => {
      setRequestingUser([approval["playerName"], approval["customID"]]);
      setRequestApprovalToast(true);

      setTimeout(() => {
        setRequestApprovalToast(false);
      }, 30000);
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("requestApproval");
    };
  }, [socket]);

  useEffect(() => {
    //* Listen for connectedToRoom events from the server
    socket.on("connectedToRoom", (connectedState) => {
      setConnected(connectedState);
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("connectedToRoom");
    };
  }, [socket]);

  //* Listen for events from the server to update the state of the checkboxes
  useEffect(() => {
    //* Listen for selectedEvidences events from the server
    socket.on("selectedEvidences", (selectedEvidences) => {
      console.log(`selectedEvidences socket: `, selectedEvidences);
      setSelectedEvidences(selectedEvidences);
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("selectedEvidences");
    };
  }, [socket]);

  //* Listen for events from the server to update the state of the checkboxes
  useEffect(() => {
    //* Listen for selectedEvidences events from the server
    socket.on("kickedFromRoom", () => {
      toast.error("Kicked by room leader!", {
        position: "bottom-left",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setConnected(false);
      socket.disconnect();
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("kickedFromRoom");
    };
  }, [socket]);

  //* Listen for events from the server to update the state of the checkboxes
  useEffect(() => {
    //* Listen for selectedEvidences events from the server
    socket.on("madeLeader", () => {
      toast.success("You were made leader of the room!", {
        position: "bottom-left",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    //* Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("madeLeader");
    };
  }, [socket]);

  //* Toggle the ghost cards collapsed/uncollapsed.
  const toggleCollapse = (ghostName: string) => {
    //? Scrollbar is constantly shifting up after collapse.
    //? This will make it scroll back basically.
    const container = document.querySelector(".Ghosts");
    let scrollTop = container?.scrollTop || 0;

    setCollapsedGhosts((prevCollapsedGhosts) => {
      const newCollapsedGhosts = {
        ...prevCollapsedGhosts,
        [ghostName]: !prevCollapsedGhosts[ghostName],
      };

      //* Find the index of the ghost in the array
      const ghostIndex = ghosts.findIndex((ghost) => ghost.name === ghostName);

      //* Remove the ghost
      const ghost = ghosts.splice(ghostIndex, 1)[0];

      //* Add the ghost back to the array based on if it's collapsed state
      if (!newCollapsedGhosts[ghostName]) ghosts.push(ghost);
      else ghosts.splice(ghostIndex, 0, ghost);
      //* Scroll back to the position where it was.
      container!.scrollTop = scrollTop;

      socket.emit("collapsedGhosts", {
        collapsedGhosts: newCollapsedGhosts,
        roomID: queries["roomID"],
      });

      return newCollapsedGhosts;
    });
  };

  //* Filter the ghosts based on the selected evidences
  const filteredGhosts = ghosts.filter((ghost) =>
    selectedEvidences.every((evidence) => ghost.evidences.includes(evidence))
  );

  const remainingEvidences = Object.keys(evidence).filter((key) => {
    return filteredGhosts.some((ghost) => ghost.evidences.includes(key));
  });

  //* Sort the ghosts based on their collapsed state and name
  filteredGhosts.sort((a, b) => {
    //* Get the states of the ghost card.
    const aCollapsed = collapsedGhosts[a.name] || false;
    const bCollapsed = collapsedGhosts[b.name] || false;

    //* If one is collapsed and the other isn't then move it to the bottom of the sort.
    if (aCollapsed && !bCollapsed) {
      return 1;
    }
    if (!aCollapsed && bCollapsed) {
      return -1;
    }

    //* Then compare by name in ascending order.
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  //* Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const updatedSelectedEvidences = checked
      ? [...selectedEvidences, id]
      : selectedEvidences.filter((evidence) => evidence !== id);
    setSelectedEvidences(updatedSelectedEvidences);
    socket.emit("selectedEvidences", {
      selectedEvidences: updatedSelectedEvidences,
      roomID: queries["roomID"],
    });
  };

  const kickPlayer = (name: string, sID: string) => {
    socket.emit("kickPlayer", {
      playerName: name,
      TheirID: sID,
      roomID: queries["roomID"],
      customID: queries["customID"],
    });
  };

  const makeLeader = (name: string, sID: string) => {
    socket.emit("makeLeader", {
      playerName: name,
      TheirID: sID,
      roomID: queries["roomID"],
      customID: queries["customID"],
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
        {requestApprovalToast && (
          <div className="toast toast-end z-50 pb-16 self-center">
            <div className="alert alert shadow-lg bg-success-content glass">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="max-w-xs">
                  <span>
                    User by the name of {requestingUser[0]} wants to join.
                  </span>
                </div>

                <br />
                <div className="float-right">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => {
                      socket.emit("playerDenied", requestingUser[1]);
                      setRequestApprovalToast(false);
                    }}
                  >
                    Deny
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      socket.emit("playerApproved", {
                        customID: requestingUser[1],
                        roomID: queries["roomID"],
                      });
                      setRequestApprovalToast(false);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="m-auto mr-5 flex-row gap-4 ">
          <div className="">
            <EvidenceCard
              evidence={evidence}
              remainingEvidences={remainingEvidences}
              selectedEvidences={selectedEvidences}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          {connected && (
            <div className="card w-500 bg-base-300 mt-5 shadow-xl max-w-xs">
              <div className="card-body">
                <h4 className="card-title">Multiplayer!</h4>
                <p className="text-xs">
                  All the multiplayer assets are found here!
                </p>

                <div className="divider mt-0 mb-0" />
                <div className="card">
                  <div className="collapse-title text-xs font-medium bg-base-200">
                    View users connected
                    <div className="divider mt-0 mb-0" />
                    <div className="flex flex-col no-scrollbar">
                      {usersList.players.names.map((name, index) => {
                        const isCurrentUser =
                          usersList.players.sID[index] === socket.id;
                        return (
                          <div
                            className="dropdown dropdown-right mb-1 mt-1 flex items-center"
                            key={index}
                          >
                            {isCurrentUser ? (
                              <div
                                className="tooltip tooltip-bottom"
                                data-tip="You can't moderate yourself."
                              >
                                <label
                                  tabIndex={0}
                                  className="btn btn-xs btn-disabled"
                                >
                                  {name}
                                </label>
                              </div>
                            ) : (
                              <label tabIndex={0} className="btn btn-xs">
                                {name}
                              </label>
                            )}

                            <ul
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-24 overflow-visible"
                              style={{ left: "50%" }}
                            >
                              <li>
                                <label
                                  onClick={() =>
                                    kickPlayer(
                                      name,
                                      usersList.players.sID[index]
                                    )
                                  }
                                >
                                  Kick
                                </label>
                              </li>
                              <li>
                                <label
                                  onClick={() =>
                                    makeLeader(
                                      name,
                                      usersList.players.sID[index]
                                    )
                                  }
                                >
                                  Make leader
                                </label>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="m-auto ml-5 flex-row gap-4">
          <div className="card w-150 bg-base-300 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title justify-center text-center">
                Phasmophobia Ghosts
              </h2>
              <p className="text-xs justify-center text-center">
                The ghosts have different abilities and such!
                <br />
                So make sure to read through them to get a better understanding
                of the ghosts!
              </p>
              <div className="divider mt-0 mb-0" />

              <div
                className="Ghosts no-scrollbar"
                style={{ maxHeight: "36rem", overflowX: "hidden" }}
              >
                <div className="gap-5 max-w-lg">
                  {filteredGhosts.map((ghost) => (
                    <div className={ghost.name} key={ghost.name}>
                      <div className="card bg-base-100 p-5">
                        <div className="card-actions justify-end ">
                          <button
                            className="btn btn-square btn-sm absolute"
                            onClick={() => {
                              toggleCollapse(ghost.name);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="card-title flex items-center">
                          <a
                            href={`https://phasmophobia.fandom.com/wiki/${ghost.name}`}
                            target="_blank"
                          >
                            {ghost.name}
                          </a>
                          <div className="flex flex-row gap-2 mb-1.5">
                            {ghost.evidences.map((evidenced) => (
                              <div
                                className={`badge badge-${evidence[evidenced]?.color} badge-outline mt-2 text-xs`}
                                key={evidenced}
                              >
                                {evidence[evidenced]?.short ??
                                  evidenced.toUpperCase()}
                              </div>
                            ))}
                          </div>
                        </div>

                        {!collapsedGhosts[ghost.name] && (
                          <>
                            <div className="text-xs">{ghost.description}</div>
                            <div className="divider " />
                            <div className="flex m-auto">
                              <div className="flex flex-row justify-center text-center">
                                <div className="card w-25 max-w-xs">
                                  <p>Identifier</p>
                                  <p className="text-xs">
                                    {ghost.identifiers?.map((identifier) => (
                                      <span
                                        key={identifier}
                                        dangerouslySetInnerHTML={{
                                          __html: identifier,
                                        }}
                                      ></span>
                                    ))}
                                  </p>
                                </div>
                                <div className="divider divider-horizontal"></div>
                                <div className="card w-25 max-w-xs">
                                  <p className="text-xm">Properties</p>
                                  <p className="text-xs">
                                    {ghost.properties?.map((properties) => (
                                      <span
                                        key={properties}
                                        dangerouslySetInnerHTML={{
                                          __html: properties,
                                        }}
                                      ></span>
                                    )) ?? <span>No properties available.</span>}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {ghost.ability && (
                              <div>
                                <div className="divider mt-5 mb-0" />
                                <div className="flex m-auto text-center justify-center">
                                  <div className="card w-25 max-w-md">
                                    <p>Unique Ability</p>
                                    <p className="text-xs">
                                      <b>{ghost.ability}</b>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <br />
                    </div>
                  ))}
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
