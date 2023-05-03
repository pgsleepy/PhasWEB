import { Key, useState } from "react";
import { EvidenceItem, Ghosts } from "@/types";

import ghost from "@/data/ghosts.json";
import evidences from "@/data/evidences.json";

const evidence: EvidenceItem = evidences;
const ghosts: Ghosts[] = ghost;

export default function Sharedevidence() {
  //* State variables
  const [collapsedGhosts, setCollapsedGhosts] = useState<{
    [key: string]: boolean;
  }>({});

  const [selectedEvidences, setSelectedEvidences] = useState<string[]>([]);

  //* Toggle the ghost cards collapsed/uncollapsed.
  const toggleCollapse = (ghostName: string) => {
    //? Scrollbar is constantly shifting up after collapse.
    //? This will make it scroll back basically.
    const container = document.querySelector(".Ghosts");
    let scrollTop = container?.scrollTop || 0;

    setCollapsedGhosts((prevCollapsedGhosts) => ({
      ...prevCollapsedGhosts,
      [ghostName]: !prevCollapsedGhosts[ghostName],
    }));

    //* Find the index of the ghost in the array
    const ghostIndex = ghosts.findIndex((ghost) => ghost.name === ghostName);

    //* Remove the ghost
    const ghost = ghosts.splice(ghostIndex, 1)[0];

    //* Add the ghost back to the array based on if it's collapsed state
    if (!collapsedGhosts[ghostName]) ghosts.push(ghost);
    else ghosts.splice(ghostIndex, 0, ghost);
    console.log(scrollTop);
    //* Scroll back to the position where it was.
    container!.scrollTop = scrollTop;
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
    if (checked) {
      setSelectedEvidences([...selectedEvidences, id]);
    } else {
      setSelectedEvidences(
        selectedEvidences.filter((evidence) => evidence !== id)
      );
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="hero-overlay bg-opacity-60 absolute"></div>
        <div className="m-auto mr-5 flex-row gap-4 ">
          <div className="card w-500 bg-base-300 shadow-xl">
            <div className="card-body">
              <h4 className="card-title">Evidence Picker!</h4>
              <p className="text-xs">
                Here you can select the evidences you've found!
                <br />
                Goodluck and happy hunting!
              </p>
              <div className="divider mt-0 mb-0" />

              {Object.keys(evidence).map((key) => {
                const item = evidence[key];
                const disabled =
                  !remainingEvidences.includes(key) &&
                  !selectedEvidences.includes(key);
                return (
                  <label
                    className="cursor-pointer flex items-center"
                    key={item.name}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={key}
                      checked={selectedEvidences.includes(key)}
                      onChange={handleCheckboxChange}
                      disabled={disabled}
                    />
                    <span className="label-text pl-5">{item.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
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
                      <div className="card bg-base-100  p-5">
                        <div className="card-actions justify-end ">
                          <button
                            className="btn btn-square btn-sm absolute"
                            onClick={() => toggleCollapse(ghost.name)}
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
    </>
  );
}
