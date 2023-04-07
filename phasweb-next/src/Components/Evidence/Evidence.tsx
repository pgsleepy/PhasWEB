import React from "react";

export default function Evidence() {
  return (
    <div>
      <label className="cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" id="dots" />
        <span className="label-text pl-5">DOTS Projector</span>
      </label>
      <label className="cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" id="emf" />
        <span className="label-text pl-5">EMF Level 5</span>
      </label>
      <label className="cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" id="fingies" />
        <span className="label-text pl-5">Fingerprints</span>
      </label>
      <label className="cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" id="freeze" />
        <span className="label-text pl-5">Freezing Temperatures</span>
      </label>
      <label className="cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" id="orbs" />
        <span className="label-text pl-5">Ghost Orbs</span>
      </label>
      <label className="cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" id="writing" />
        <span className="label-text pl-5">Ghost Writing</span>
      </label>
      <label className="cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" id="sbox" />
        <span className="label-text pl-5">Spirit Box</span>
      </label>
    </div>
  );
}
