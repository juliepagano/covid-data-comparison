import React from "react";
import ScaleChart from "./ScaleChart";

import "./DataCharts.scss";

interface DataChartsProps {
  chartScales: ImpactScale[];
}

const DataCharts = ({ chartScales }: DataChartsProps) => {
  let prevScale: Omit<ImpactScale, "entries">;

  return (
    <div className="DataCharts">
      {chartScales.map(({ color, scale, entries }) => {
        if (!entries.length) {
          return null;
        }

        const scaleChart = (
          <ScaleChart
            key={scale}
            color={color}
            scale={scale}
            entries={entries}
            prevScale={prevScale}
          />
        );

        prevScale = {
          color,
          scale,
        };

        return scaleChart;
      })}
    </div>
  );
};
export default DataCharts;
