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

type DataTypes =
  | "STATE_COVID"
  | "US_COVID"
  | "ANNUAL_DEATH_STATS"
  | "OTHER_PANDEMICS"
  | "VIOLENCE"
  | "WARS"
  | "NATURAL_DISASTERS"
  | "OTHER";

interface ChartEntry {
  label: string;
  value: number;
  isCovid?: boolean;
  source?: string;
  dataType?: DataTypes;
}

interface ImpactScale {
  color: string;
  scale: number;
  entries: ChartEntry[];
}

interface DataTypeOptions {
  name: string;
  label: string;
  dataType: DataTypes;
}

type OptionsConfig = Record<string, boolean>;
