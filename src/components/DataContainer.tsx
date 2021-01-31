import React, { useEffect, useState } from "react";
import { getLatestUSData } from "../services/covidTrackingService";
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
  const [covidData, setCovidData] = useState<CovidData>();

  useEffect(() => {
    async function fetchData() {
      const result = await getLatestUSData();
      setCovidData(result);
    }
    fetchData();
  }, []);

  if (!covidData) {
    return null;
  }

  return (
    <div className="DataCharts">
      {COVID_ENTRIES.map(({ label, dataKey }) => {
        const value = get(covidData, dataKey);
        console.log(covidData);
        console.log(dataKey);
        console.log(value);
        console.log("-------");

        if (typeof value !== "number") {
          return null;
        }

        return (
          <SquareChart
            key={dataKey}
            label={label}
            value={value}
            scaleValue={1000}
            color="blue"
          />
        );
      })}
    </div>
  );
}

export default DataContainer;
