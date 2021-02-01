import React from "react";
import SquareChart from "./SquareChart";
import numbro from "numbro";
import cx from "classnames";

import "./ScaleChart.scss";

interface ScaleChartProps extends ImpactScale {
  prevScale?: Omit<ImpactScale, "entries">;
}

const ScaleChart = ({ entries, scale, color, prevScale }: ScaleChartProps) => {
  const renderLegend = () => {
    const equals = <div className="equals">=</div>;
    const legendValue = (
      <div
        className={cx("value", {
          hasPrev: prevScale,
        })}
      >
        (
        {numbro(scale).format({
          thousandSeparated: true,
          mantissa: 0,
        })}{" "}
        deaths)
      </div>
    );
    const currentLegend = (
      <SquareChart
        layout="inline"
        scaleValue={scale}
        value={scale}
        color={color}
        minWidth={0}
      />
    );

    if (!prevScale) {
      return (
        <div className="Legend">
          {currentLegend}
          {equals}
          {legendValue}
        </div>
      );
    }

    return (
      <div className="Legend">
        {prevScale && (
          <SquareChart
            layout="inline"
            scaleValue={prevScale.scale}
            value={scale}
            color={prevScale.color}
            minWidth={0}
          />
        )}
        {equals}
        {currentLegend}
        {legendValue}
      </div>
    );
  };

  return (
    <section className="ScaleChart">
      {renderLegend()}
      {entries.map(({ label, isCovid, dataType, value, ...otherEntry }) => {
        const formattedValue = numbro(value).format({
          thousandSeparated: true,
          mantissa: 0,
        });

        return (
          <SquareChart
            key={label}
            label={`${label} (${formattedValue})`}
            value={value}
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
