export type IpoStatus = "Open" | "Upcoming" | "Closed" | "Listed" | "SME";

export type BoardType = "Mainboard" | "BSE SME" | "NSE Emerge";

export interface IpoDate {
  label: string;
  date: string;
  state: "completed" | "current" | "upcoming";
}

export interface IpoSubscription {
  total: number;
  qib: number;
  nii: number;
  retail: number;
}

export interface IpoFinancial {
  year: string;
  revenueCr: number;
  patCr?: number;
}

export interface IpoPeer {
  name: string;
  pe: number;
  roe: number;
}

export interface Ipo {
  slug: string;
  symbol: string;
  name: string;
  image?: string;
  status: IpoStatus;
  board: BoardType;
  priceBand: string;
  issuePrice: number; // Cap price
  lotSize: number;
  gmp: number; // in INR ₹
  gmpHistory: number[]; // 7 days of GMP history
  subscription: IpoSubscription;
  kostak: number;
  sauda: number;
  dates: IpoDate[];
  financials: IpoFinancial[];
  peers: IpoPeer[];
  strengths: string[];
  risks: string[];
  sector?: string;
  registrar?: string;
  registrarUrl?: string;
  issueSizeCr?: number;
  listingDate?: string;
  allotmentDate?: string;
  openDate?: string;
  closeDate?: string;
  description?: string;
  updatedAt?: string;
  securityType?: string;
  listingAtGroup?: string;
  statusLabel?: string;
  listedPrice?: number;
  currentPrice?: number;
  listingDayGain?: number;
  rawApiData?: any;
}

export type GmpSignal = "Strong" | "Neutral" | "Weak";
