import React, { useEffect, useState } from "react";
import {
  getLatestUSData,
  getStateMetadata,
} from "../services/covidTrackingService";
import SquareChart from "./SquareChart";
import get from "lodash.get";

import "./DataContainer.scss";

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
  source?: string;
}

const COVID_ENTRIES = [
  {
    label: "Total deaths from Covid",
    dataKey: "outcomes.death.total.value",
  },
  {
    label: "Today's deaths from Covid",
    dataKey: "outcomes.death.total.calculated.change_from_prior_day",
  },
];

function DataContainer() {
  const [chartEntries, setChartEntries] = useState<ChartEntry[]>();

  useEffect(() => {
    async function fetchData() {
      const newChartEntries: ChartEntry[] = [];

      try {
        const usResult = await getLatestUSData();

        COVID_ENTRIES.forEach(({ label, dataKey }) => {
          const value = get(usResult, dataKey);

          if (typeof value === "number") {
            newChartEntries.push({
              label: `US ${label}`,
              value: value,
              source: "https://covidtracking.com/",
            });
          }
        });
      } catch (e) {
        // error
      }

      setChartEntries(newChartEntries);
    }
    fetchData();
  }, []);

  if (!chartEntries) {
    return null;
  }

  return (
    <div className="DataCharts">
      {chartEntries.map(({ label, value, source }) => {
        return (
          <SquareChart
            key={label}
            label={label}
            value={value}
            source={source}
            scaleValue={1000}
            color="blue"
          />
        );
      })}
    </div>
  );
}

export default DataContainer;
