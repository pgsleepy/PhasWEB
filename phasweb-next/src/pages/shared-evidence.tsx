import EvidenceCard from "@/Components/Evidence";
import GhostsCard from "@/Components/GhostsCard";

export default function sharedevidence() {
  return (
    <>
      <div className="flex h-screen">
        <div className="hero-overlay bg-opacity-60 absolute"></div>
        <div className="m-auto mr-5 flex-row gap-4 ">
          <EvidenceCard />
        </div>
        <div className="m-auto ml-5 flex-row gap-4">
          <GhostsCard />
        </div>
      </div>
    </>
  );
}
