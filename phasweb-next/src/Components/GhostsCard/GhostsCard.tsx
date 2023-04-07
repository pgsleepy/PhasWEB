import Ghost from "../Ghost";

export default function GhostsCard() {
  return (
    <div className="card w-150 bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Phasmophobia Ghosts</h2>
        <p className="text-xs">
          The ghosts have different abilities and such!
          <br />
          So make sure to read through them to get a better understanding of the
          ghosts!
          <br />
          The list is scrollable!
        </p>
        <div className="divider" />

        <div
          className="Ghosts overflow-auto no-scrollbar"
          style={{ maxHeight: "36rem", overflowX: "hidden" }}
        >
          <Ghost />
        </div>
      </div>
    </div>
  );
}
