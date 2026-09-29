export interface AptitudeResult {
  completed: boolean;
  quantitative: number;
  logicalReasoning: number;
  verbal: number;
  dataInterpretation: number;
  overall: number;
  completedAt: string;
}

export interface SoftSkillsResult {
  completed: boolean;
  communication: number;
  teamwork: number;
  leadership: number;
  problemSolving: number;
  adaptability: number;
  timeManagement: number;
  overall: number;
  completedAt: string;
}

export interface ProfileData {
  name: string;
  email: string;
  branch: string;
  year: string;
  semester: string;
  college: string;
  cgpa: string;
  ssc: string;
  hsc: string;
  internships: string;
  projects: string;
  certifications: string;
  targetDomain: string;
  targetRole: string;
}

export interface StudentData {
  profile?: ProfileData;
  aptitude?: AptitudeResult;
  softSkills?: SoftSkillsResult;
}

/* =========================================================
   USER-SPECIFIC STORAGE
========================================================= */

const STORAGE_PREFIX = "engineerOSStudentData:";

/*
  Get the currently logged-in user's email.

  The email is stored after successful login/signup
  in localStorage under "user".
*/

const getCurrentUserEmail = (): string | null => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user?.email) {
      return null;
    }

    return String(user.email)
      .trim()
      .toLowerCase();
  } catch (error) {
    console.error(
      "Error reading logged-in user:",
      error
    );

    return null;
  }
};

/*
  Create a unique storage key for each user.

  Example:

  engineerOSStudentData:pooja@gmail.com
*/

const getStorageKey = (): string | null => {
  const email = getCurrentUserEmail();

  if (!email) {
    return null;
  }

  return `${STORAGE_PREFIX}${email}`;
};


/* =========================================================
   GET STUDENT DATA
========================================================= */

export const getStudentData = (): StudentData => {
  try {
    const storageKey = getStorageKey();

    /*
      No logged-in user = no student data.
    */

    if (!storageKey) {
      return {};
    }

    const data = localStorage.getItem(
      storageKey
    );

    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error(
      "Error reading student data:",
      error
    );

    return {};
  }
};


/* =========================================================
   SAVE STUDENT DATA
========================================================= */

export const saveStudentData = (
  data: StudentData
) => {
  try {
    const storageKey = getStorageKey();

    /*
      Never save student information if there is
      no authenticated user.
    */

    if (!storageKey) {
      console.error(
        "Cannot save student data: user is not logged in."
      );

      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(
      "Error saving student data:",
      error
    );
  }
};


/* =========================================================
   SAVE APTITUDE RESULT
========================================================= */

export const saveAptitudeResult = (
  result: AptitudeResult
) => {
  const current = getStudentData();

  saveStudentData({
    ...current,
    aptitude: result,
  });
};


/* =========================================================
   SAVE SOFT SKILLS RESULT
========================================================= */

export const saveSoftSkillsResult = (
  result: SoftSkillsResult
) => {
  const current = getStudentData();

  saveStudentData({
    ...current,
    softSkills: result,
  });
};


/* =========================================================
   CLEAR CURRENT USER'S LOCAL DATA
========================================================= */

export const clearStudentData = () => {
  try {
    const storageKey = getStorageKey();

    if (!storageKey) {
      return;
    }

    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error(
      "Error clearing student data:",
      error
    );
  }
};