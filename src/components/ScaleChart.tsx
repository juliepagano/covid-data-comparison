import React from "react";
import SquareChart from "./SquareChart";
import numbro from "numbro";

import "./ScaleChart.scss";

type ScaleChartProps = ImpactScale;

const ScaleChart = ({ entries, scale, color }: ScaleChartProps) => {
  return (
    <section className="ScaleChart">
      <h2>
        {numbro(scale).format({
          thousandSeparated: true,
          mantissa: 0,
        })}
      </h2>
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
};

export default ScaleChart;
