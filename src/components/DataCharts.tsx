import React from "react";
import ScaleChart from "./ScaleChart";

import "./DataCharts.scss";

interface DataChartsProps {
  chartScales: ImpactScale[];
}

const DataCharts = ({ chartScales }: DataChartsProps) => {
  return (
    <div className="DataCharts">
      {chartScales.map(({ color, scale, entries }) => {
        if (!entries.length) {
          return null;
        }

        return (
          <ScaleChart
            key={scale}
            color={color}
            scale={scale}
            entries={entries}
          />
        );
      })}
    </div>
  );
};
export default DataCharts;
