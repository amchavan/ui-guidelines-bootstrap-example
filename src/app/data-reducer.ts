export class DataReducer {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  institution?: string;
  arc: string;
  manualCalibration: boolean;
  manualImaging: boolean;
  weblogReview: boolean;
  qa2Approval: boolean;
  active: boolean;

  constructor() {
  }
}

export const allDataReducers : DataReducer[] = [
  {
    userId: "fmercury",
    firstName: "Freddy",
    lastName: "Mercury",
    email: "fmercury@eso.org",
    arc: "EU",
    institution: "ESO",
    manualCalibration: true,
    manualImaging: true,
    weblogReview: true,
    qa2Approval: false,
    active: false
  },
  {
    userId: "bmay",
    firstName: "Brian",
    lastName: "May",
    email: "bmay@alma.cl",
    arc: "JAO",
    institution: "ALMA",
    manualCalibration: true,
    manualImaging: false,
    weblogReview: false,
    qa2Approval: true,
    active: true
  },
  {
    userId: "jhex",
    firstName: "Jimi",
    lastName: "Hendrix",
    email: "jhex@nrao.edu",
    arc: "NA",
    institution: "NRAO",
    manualCalibration: true,
    manualImaging: true,
    weblogReview: false,
    qa2Approval: false,
    active: false
  }
];
