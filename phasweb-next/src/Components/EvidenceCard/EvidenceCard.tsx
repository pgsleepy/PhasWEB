import Evidence from "../Evidence";

export default function EvidenceCard() {
  return (
    <div className="card w-500 bg-base-300 shadow-xl">
      <div className="card-body">
        <h4 className="card-title">Evidence Picker!</h4>
        <p className="text-xs">
          Here you can select the evidences you&apos;ve found!
          <br />
          Goodluck and happy hunting!
        </p>
        <div className="divider" />

        <Evidence />
      </div>
    </div>
  );
}
