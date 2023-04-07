export default function EvidenceCard() {
  return (
    <div className="card w-500 bg-base-300 shadow-xl">
      <div className="card-body">
        <h4 className="card-title">Evidence Picker!</h4>
        <p className="text-xs">
          Here you can select the evidences you've found!
          <br />
          Goodluck and happy hunting!
        </p>
        <div className="divider" />
        <label className="cursor-pointer flex items-center">
          <input type="checkbox" className="checkbox" id="dotsies" />
          <span className="label-text pl-5">DOTS Projector</span>
        </label>
        <label className="cursor-pointer flex items-center">
          <input type="checkbox" className="checkbox" id="emfies" />
          <span className="label-text pl-5">EMF Level 5</span>
        </label>
        <label className="cursor-pointer flex items-center">
          <input type="checkbox" className="checkbox" id="fingies" />
          <span className="label-text pl-5">Fingerprints</span>
        </label>
        <label className="cursor-pointer flex items-center">
          <input type="checkbox" className="checkbox" id="freezies" />
          <span className="label-text pl-5">Freezing Temperatures</span>
        </label>
        <label className="cursor-pointer flex items-center">
          <input type="checkbox" className="checkbox" id="orbies" />
          <span className="label-text pl-5">Ghost Orbs</span>
        </label>
        <label className="cursor-pointer flex items-center">
          <input type="checkbox" className="checkbox" id="writies" />
          <span className="label-text pl-5">Ghost Writing</span>
        </label>
        <label className="cursor-pointer flex items-center">
          <input type="checkbox" className="checkbox" id="boxies" />
          <span className="label-text pl-5">Spirit Box</span>
        </label>
      </div>
    </div>
  );
}
