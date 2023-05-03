export interface EvidenceItem {
  [key: string]: {
    name: string;
    short?: string;
    color: string;
  };
}

export interface Ghosts {
  name: string;
  description: string;
  evidences: string[];
  identifiers: string[];
  properties?: string[] | null;
  ability?: string | null;
}
