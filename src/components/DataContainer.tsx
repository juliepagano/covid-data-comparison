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
  isCovid?: boolean;
  source?: string;
}

interface ImpactScale {
  color: string;
  scale: number;
  entries: ChartEntry[];
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

const IMPACT_SCALES: ImpactScale[] = [
  {
    color: "green",
    scale: 1,
    entries: [],
  },
  {
    color: "blue",
    scale: 10,
    entries: [
      {
        label: "Oklahoma City Bombings",
        value: 168,
      },
      {
        label: "Jonestown",
        value: 918,
      },
      { label: "Columbine", value: 15 },
      {
        label: "Waco siege",
        value: 86,
      },
    ],
  },
  // {
  //   color: "#f5e751",
  //   scale: 100,
  //   entries: [
  //     {
  //       label: "Oklahoma City Bombings",
  //       value: 168,
  //     },
  //     {
  //       label: "Jonestown",
  //       value: 918,
  //     },
  //   ],
  // },
  {
    color: "orange",
    scale: 1000,
    entries: [
      {
        label: "US deaths in Vietnam War",
        value: 58209,
      },
      {
        label: "US motor vehicle traffic deaths in 2019",
        value: 37595,
      },
      {
        label: "9/11",
        value: 2996,
      },
      {
        label: "Deaths from flu and pneumonia in 2019",
        value: 49783,
      },
      {
        label: "Deaths from homicide in 2019",
        value: 19141,
      },
      {
        label: "Attack on Pearl Harbor",
        value: 2467,
      },
      {
        label: "Hurricane Katrina",
        value: 1833,
      },
      {
        label: "US deaths in Iraq War",
        value: 4497,
      },
    ],
  },
  // {
  //   color: "red",
  //   scale: 10000,
  //   entries: [],
  // },
  {
    color: "black",
    scale: 100000,
    entries: [
      {
        label: "HIV/AIDS in the US as of 2018",
        value: 700000,
      },
      {
        label: "1918 Spanish Flu in the US",
        value: 675000,
      },
      {
        label: "Deaths in US Civil War",
        value: 655000,
      },
      {
        label: "US deaths in WWII",
        value: 405399,
      },
      {
        label: "US deaths in WWI",
        value: 116516,
      },
      {
        label: "Unintentional injury deaths in 2019",
        value: 173040,
      },
    ],
  },
];

const reversedImpactScales = [...IMPACT_SCALES].reverse();

function DataContainer() {
  const [chartEntries, setChartEntries] = useState<ChartEntry[]>();
  const [chartScales, setChartScales] = useState<ImpactScale[]>();

  useEffect(() => {
    async function fetchData() {
      const scaleMap = IMPACT_SCALES.reduce((result, { scale }) => {
        result.set(scale, []);
        return result;
      }, new Map());
      console.log(scaleMap);

      const newChartEntries: ChartEntry[] = [];

      try {
        const usResult = await getLatestUSData();

        COVID_ENTRIES.forEach(({ label, dataKey }) => {
          const value = get(usResult, dataKey);

          if (typeof value === "number") {
            const matchingScale = reversedImpactScales.find(
              (scale) => value >= scale.scale
            );
            if (matchingScale) {
              scaleMap.set(matchingScale.scale, [
                ...scaleMap.get(matchingScale.scale),
                {
                  label: `US ${label}`,
                  value: value,
                  isCovid: true,
                  source: "https://covidtracking.com/",
                },
              ]);
            }

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

      console.log(scaleMap);

      setChartEntries(newChartEntries);

      const newChartScales = IMPACT_SCALES.map(
        ({ entries, scale, ...otherScale }) => {
          const combinedEntries = [...entries, ...scaleMap.get(scale)].sort(
            (a, b) => a.value - b.value
          );

          return {
            ...otherScale,
            scale,
            entries: combinedEntries,
          };
        }
      );
      setChartScales(newChartScales);
    }
    fetchData();
  }, []);

  if (!chartEntries || !chartScales) {
    return null;
  }

  return (
    <div className="DataCharts">
      <div>
        {chartScales.map(({ color, scale, entries }) => {
          if (!entries.length) {
            return null;
          }

          return (
            <section key={scale}>
              <h2>{scale}</h2>
              {entries.map(({ label, isCovid, ...otherEntry }) => {
                return (
                  <SquareChart
                    key={label}
                    label={label}
                    scaleValue={scale}
                    color={color}
                    highlight={isCovid}
                    {...otherEntry}
                  />
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default DataContainer;
