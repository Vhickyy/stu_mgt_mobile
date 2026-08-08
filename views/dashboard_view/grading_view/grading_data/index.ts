// -----------------------------------------------------------------------
// FAKE API — mirrors what /grading-system (GET) and /grading-system (POST)
// would return. Swap the bodies for real requests later.
// -----------------------------------------------------------------------

import { GradingSystem, SaveGradingSystemInput } from "../grading_types";

const STANDARD_4_0: GradingSystem = {
  type: "4.0",
  scale: 4.0,
  bands: [
    { letter: "A", value: 4.0 },
    { letter: "B", value: 3.0 },
    { letter: "C", value: 2.0 },
    { letter: "D", value: 1.0 },
    { letter: "F", value: 0.0 },
  ],
};

const STANDARD_5_0: GradingSystem = {
  type: "5.0",
  scale: 5.0,
  bands: [
    { letter: "A", value: 5.0 },
    { letter: "B", value: 4.0 },
    { letter: "C", value: 3.0 },
    { letter: "D", value: 2.0 },
    { letter: "F", value: 0.0 },
  ],
};

// In-memory "DB" for this fake API — starts as null (no grading system chosen yet),
// which is what drives the "show setup screen vs dashboard" branch on the app shell.
let currentGradingSystem: GradingSystem | null = null;

function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/** Simulates GET /grading-system — null means the student hasn't set one up yet. */
export async function fetchGradingSystem(): Promise<GradingSystem | null> {
  return delay(currentGradingSystem);
}

/** Simulates POST /grading-system */
export async function saveGradingSystem(
  input: SaveGradingSystemInput,
): Promise<GradingSystem> {
  if (input.type === "4.0") {
    currentGradingSystem = STANDARD_4_0;
  } else if (input.type === "5.0") {
    currentGradingSystem = STANDARD_5_0;
  } else {
    currentGradingSystem = {
      type: "custom",
      scale: input.scale ?? 4.0,
      bands: input.bands ?? [],
    };
  }
  return delay(currentGradingSystem);
}
