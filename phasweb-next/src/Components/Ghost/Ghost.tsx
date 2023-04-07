import { useState } from "react";

type GhostName = keyof typeof ghosts;

const ghosts = [
  {
    index: 0,
    name: "Deogen",
    description: "A deogen is a speed demon when far, a snail demon when near!",
    evidences: ["writing", "sbox", "dots"],
    identifiers: [
      "&bull; <b>Always</b> knows where you are. <br />",
      "&bull; Very fast when far. <br />",
      "&bull; Very slow when near. <br />",
    ],
    properties: [
      "&bull; Above 6 meters: <b>3 m/s</b> <br />",
      "&bull; Below 2.5 meters: <b>0.4 m/s</b> <br />",
    ],
  },
  {
    index: 1,
    name: "Spirit",
    description: "A spirit is a very boring ghosts with no special abilities.",
    evidences: ["emf", "sbox", "finger"],
    identifiers: [
      "&bull; You can smudge it yata <br />",
      "&bull; Yeet yeet <br />",
      "&bull; yaat yaat. <br />",
    ],
  },
  {
    index: 2,
    name: "Banshee",
    description:
      "A banshee has one target to kill and will not rest otherwise.",
    evidences: ["finger", "orbs", "dots"],
    identifiers: [
      "&bull; You can smudge it yata <br />",
      "&bull; Yeet yeet <br />",
      "&bull; yaat yaat. <br />",
    ],
  },
];

export default function Ghost() {
  //* State variable
  const [collapsedGhosts, setCollapsedGhosts] = useState<{
    [key: string]: boolean;
  }>({});

  //* Toggle the ghost cards collapsed/uncollapsed.
  const toggleCollapse = (ghostName: string) => {
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
  };

  //* Sort the ghosts based on their collapsed state and name
  const sortedGhosts = ghosts.sort((a, b) => {
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

  return (
    <div className="gap-5">
      {sortedGhosts.map((ghost) => (
        <div className={ghost.name} key={ghost.name}>
          <div className="card bg-base-100 p-5">
            <div className="card-actions justify-end">
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
              <a href="/">{ghost.name}</a>
              <div className="flex flex-row gap-2 mb-1.5">
                {ghost.evidences.map((evidence) => (
                  <div
                    className="badge badge-primary badge-outline mt-2 text-xs"
                    key={evidence}
                  >
                    {evidence.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {!collapsedGhosts[ghost.name] && (
              <>
                <div className="text-xs">{ghost.description}</div>

                <div className="divider" />
                <div className="flex m-auto">
                  <div className="flex flex-row">
                    <div className="card w-25 ">
                      <p className="text-xm">Identifier</p>
                      <p className="text-xs">
                        {ghost.identifiers?.map((identifier) => (
                          <span
                            key={identifier}
                            dangerouslySetInnerHTML={{ __html: identifier }}
                          ></span>
                        ))}
                      </p>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="card w-25 ">
                      <p className="text-xm">Properties</p>
                      <p className="text-xs">
                        {ghost.properties?.map((properties) => (
                          <span
                            key={properties}
                            dangerouslySetInnerHTML={{ __html: properties }}
                          ></span>
                        )) ?? <span>No properties available.</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}
