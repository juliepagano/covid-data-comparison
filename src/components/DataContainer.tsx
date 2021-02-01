import React, { useEffect, useState } from "react";
import {
  getLatestUSData,
  getStateMetadata,
  getLatestStateData,
} from "../services/covidTrackingService";
import get from "lodash.get";
import DataCharts from "./DataCharts";
import annualDeathStats from "../constants/annualDeathStats";
import dataTypeOptions from "../constants/dataTypeOptions";

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
  {
    color: "orange",
    scale: 1000,
    entries: [
      {
        label: "US deaths in Vietnam War",
        value: 58209,
      },
      {
        label: "9/11",
        value: 2996,
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
  {
    color: "black",
    scale: 100000,
    entries: [
      {
        label: "HIV/AIDS in the US as of 2018",
        value: 700000,
        source: "https://www.kff.org/",
      },
      {
        label: "1918 Spanish Flu in the US",
        value: 675000,
        source:
          "https://www.cdc.gov/flu/pandemic-resources/1918-pandemic-h1n1.html",
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
    ],
  },
];

const reversedImpactScales = [...IMPACT_SCALES].reverse();

function getMatchingScale(value: number) {
  return reversedImpactScales.find((scale) => value >= scale.scale);
}

interface DataContainerProps {
  optionsConfig: OptionsConfig;
}

function DataContainer({ optionsConfig }: DataContainerProps) {
  const [chartScales, setChartScales] = useState<ImpactScale[]>();
  const [filteredChartScales, setFilteredChartScales] = useState<
    ImpactScale[]
  >();

  useEffect(() => {
    async function fetchData() {
      const scaleMap = IMPACT_SCALES.reduce((result, { scale }) => {
        result.set(scale, []);
        return result;
      }, new Map());

      annualDeathStats.forEach(({ value, ...otherData }) => {
        if (typeof value !== "number") {
          return;
        }
        const matchingScale = getMatchingScale(value);
        if (matchingScale) {
          scaleMap.set(matchingScale.scale, [
            ...scaleMap.get(matchingScale.scale),
            {
              ...otherData,
              value: value,
              isCovid: false,
              dataType: "ANNUAL_DEATH_STATS",
            },
          ]);
        }
      });

      try {
        const usResult = await getLatestUSData();

        COVID_ENTRIES.forEach(({ label, dataKey }) => {
          const value = get(usResult, dataKey);

          if (typeof value === "number") {
            const matchingScale = getMatchingScale(value);
            if (matchingScale) {
              scaleMap.set(matchingScale.scale, [
                ...scaleMap.get(matchingScale.scale),
                {
                  label: `US: ${label}`,
                  value: value,
                  isCovid: true,
                  dataType: "US_COVID",
                  source: "https://covidtracking.com/",
                },
              ]);
            }
          }
        });
      } catch (e) {
        // error
      }

      try {
        const stateMeta = await getStateMetadata();

        const stateResults = await Promise.all(
          stateMeta.map(({ state_code }: { state_code: string }) => {
            return getLatestStateData(state_code);
          })
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stateResults.forEach((stateResult: any) => {
          const state: string = stateResult.state;

          COVID_ENTRIES.forEach(({ label, dataKey }) => {
            const value = get(stateResult, dataKey);

            if (typeof value === "number") {
              const matchingScale = getMatchingScale(value);
              if (matchingScale) {
                scaleMap.set(matchingScale.scale, [
                  ...scaleMap.get(matchingScale.scale),
                  {
                    label: `${state}: ${label}`,
                    value: value,
                    isCovid: true,
                    dataType: "STATE_COVID",
                    source: "https://covidtracking.com/",
                  },
                ]);
              }
            }
          });
        });
      } catch (e) {
        // error
      }

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

  useEffect(() => {
    if (!chartScales) {
      return;
    }

    const allowedDataTypes: ChartEntry["dataType"][] = ["OTHER"];
    dataTypeOptions.forEach(({ name, dataType }) => {
      if (optionsConfig[name]) {
        allowedDataTypes.push(dataType);
      }
    });

    const newFilteredChartScales = chartScales.map(
      ({ entries, ...otherScale }) => {
        return {
          ...otherScale,
          entries: entries.filter(({ dataType = "OTHER" }) => {
            return allowedDataTypes.includes(dataType);
          }),
        };
      }
    );
    setFilteredChartScales(newFilteredChartScales);
  }, [chartScales, optionsConfig]);

  if (!filteredChartScales) {
    return null;
  }

  return <DataCharts chartScales={filteredChartScales} />;
}

export default DataContainer;
