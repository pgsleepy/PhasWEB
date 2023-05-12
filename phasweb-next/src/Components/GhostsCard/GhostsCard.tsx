import React from "react";
import { EvidenceItem, Ghosts } from "@/types";

import evidences from "@/data/evidences.json";

type Props = {
  ghost: Ghosts;
  collapsed: boolean;
  toggleCollapse: (name: string) => void;
  socket: any;
};

const evidence: EvidenceItem = evidences;

const GhostCard: React.FC<Props> = ({
  ghost,
  collapsed,
  toggleCollapse,
  socket,
}) => {
  return (
    <div className="card w-150 bg-base-300 shadow-xl">
      <div className="card-body ">
        <h2 className="card-title justify-center text-center">
          Phasmophobia Ghosts
        </h2>
        <p className="text-xs justify-center text-center">
          The ghosts have different abilities and such!
          <br />
          So make sure to read through them to get a better understanding of the
          ghosts!
        </p>
        <div className="divider mt-0 mb-0" />

        <div
          className="Ghosts no-scrollbar"
          style={{ maxHeight: "36rem", overflowX: "hidden" }}
        >
          <div className="gap-5 max-w-lg">
            <div className={ghost.name}>
              <div className="card bg-base-100  p-5">
                <div className="card-actions justify-end ">
                  <button
                    className="btn btn-square btn-sm absolute"
                    onClick={() => {
                      toggleCollapse(ghost.name);
                      socket.emit("ghostCollapse", ghost.name);
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
                        {evidence[evidenced]?.short ?? evidenced.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>

                {!collapsed && (
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
          </div>
        </div>
      </div>
    </div>
  );
};
