/**
 * Impact calculator: estimates what replacing kerosene wick lamps with solar lighting saves.
 * These are deliberately simple, published assumptions; the UI shows them next to the results.
 */
export const IMPACT_ASSUMPTIONS = {
  /** A simple kerosene wick lamp burns roughly 0.02–0.04 L per hour; we use the middle. */
  keroseneLitresPerLampHour: 0.03,
  /** CO₂ released by burning one litre of kerosene (IPCC default emission factor). */
  co2KgPerLitre: 2.52,
  daysPerYear: 365,
} as const;

export interface ImpactInputs {
  households: number;
  hoursPerNight: number;
  /** Kerosene price in Zambian kwacha per litre. */
  kerosenePrice: number;
}

export interface ImpactResult {
  litres: number;
  savingsZmw: number;
  co2Tonnes: number;
  lightHours: number;
}

export const IMPACT_RANGES = {
  households: { min: 1, max: 1000, step: 1, initial: 50 },
  hoursPerNight: { min: 1, max: 8, step: 0.5, initial: 4 },
  kerosenePrice: { min: 10, max: 60, step: 1, initial: 28 },
} as const;

export function estimateImpact({ households, hoursPerNight, kerosenePrice }: ImpactInputs): ImpactResult {
  const { keroseneLitresPerLampHour, co2KgPerLitre, daysPerYear } = IMPACT_ASSUMPTIONS;
  const lightHours = households * hoursPerNight * daysPerYear;
  const litres = lightHours * keroseneLitresPerLampHour;
  return {
    litres,
    savingsZmw: litres * kerosenePrice,
    co2Tonnes: (litres * co2KgPerLitre) / 1000,
    lightHours,
  };
}
