import React, { useEffect, useState } from "react";
import {
  getLatestUSData,
  getStateMetadata,
  getLatestStateData,
} from "../services/covidTrackingService";
import get from "lodash.get";
import DataCharts from "./DataCharts";
import annualDeathStats from "../constants/annualDeathStats";
import otherPandemics from "../constants/otherPandemics";
import dataTypeOptions from "../constants/dataTypeOptions";
import violence from "../constants/violence";
import wars from "../constants/wars";
import naturalDisasters from "../constants/naturalDisasters";
import IMPACT_SCALES from "../constants/impactScales";

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

      const processData = (dataToProcess: ChartEntry[], dataType: string) => {
        dataToProcess.forEach(({ value, ...otherData }) => {
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
                dataType: dataType,
              },
            ]);
          }
        });
      };

      processData(annualDeathStats, "ANNUAL_DEATH_STATS");
      processData(otherPandemics, "OTHER_PANDEMICS");
      processData(violence, "VIOLENCE");
      processData(wars, "WARS");
      processData(naturalDisasters, "NATURAL_DISASTERS");

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
      ({ entries, scale, ...otherScale }, index) => {
        const filteredEntries = entries.filter(({ dataType = "OTHER" }) => {
          return allowedDataTypes.includes(dataType);
        });

        return {
          ...otherScale,
          scale,
          entries: filteredEntries,
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
