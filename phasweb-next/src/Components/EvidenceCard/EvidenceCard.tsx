import { EvidenceItem } from "@/types";

interface Props {
  evidence: EvidenceItem;
  remainingEvidences: string[];
  selectedEvidences: string[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EvidenceCard: React.FC<Props> = ({
  evidence,
  remainingEvidences,
  selectedEvidences,
  handleCheckboxChange,
}) => {
  return (
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
            <label className="cursor-pointer flex items-center" key={item.name}>
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
  );
};

export default EvidenceCard;
