export type GradingScaleType = "4.0" | "5.0" | "custom";

export interface GradeBand {
  letter: string; // "A", "B", "C"...
  value: number;
}

export interface GradingSystem {
  type: GradingScaleType;
  scale: number; // 4.0 or 5.0 (custom uses its own max)
  bands: GradeBand[];
}

export interface SaveGradingSystemInput {
  type: GradingScaleType;
  scale?: number; // required if type === "custom"
  bands?: GradeBand[]; // required if type === "custom"
}
