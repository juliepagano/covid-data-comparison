interface CovidDataDeathOutcome {
  total: {
    value: number;
    calculated: {
      change_from_prior_day: number;
      population_percent: number;
      seven_day_average: number;
      seven_day_change_percent: number;
    };
  };
  [key: string]: unknown;
}

interface CovidDataOutcomes {
  death: CovidDataDeathOutcome;
  [key: string]: unknown;
}

interface CovidData {
  date: string;
  outcomes: CovidDataOutcomes;
  [key: string]: unknown;
}

interface ChartEntry {
  label: string;
  value: number;
  isCovid?: boolean;
  source?: string;
  dataType?: "STATE_COVID" | "US_COVID" | "OTHER";
}

interface ImpactScale {
  color: string;
  scale: number;
  entries: ChartEntry[];
}
