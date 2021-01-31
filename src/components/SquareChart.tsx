import React, { Fragment } from "react";
import numbro from "numbro";

import "./SquareChart.scss";

interface SquareChartProps {
  label: string;
  value: number;
  scaleValue: number;
  color?: string;
  minWidth?: number;
  maxWidth?: number;
}

// Box size in pixels
const BOX_SIZE_PX = 8;
const BOX_PADDING = 3;
const BOX_STROKE_WIDTH = 1;

// Group size in number of boxes
const GROUP_SIZE = 5;
const BOXES_IN_GROUP = GROUP_SIZE ** 2;
const GROUP_PADDING = BOX_PADDING * 2;
const GROUP_SIZE_PX = BOX_SIZE_PX * GROUP_SIZE + BOX_PADDING * (GROUP_SIZE - 1);

// Section size in number of groups
const SECTION_SIZE = 2;
const GROUPS_IN_SECTION = SECTION_SIZE ** 2;
const BOXES_IN_SECTION = GROUPS_IN_SECTION * BOXES_IN_GROUP;
const SECTION_PADDING = GROUP_PADDING * 2;
const SECTION_SIZE_PX =
  GROUP_SIZE_PX * SECTION_SIZE + GROUP_PADDING * (SECTION_SIZE - 1);

function SquareChart({
  label,
  value,
  scaleValue,
  color,
  minWidth = 250,
  maxWidth = 500,
}: SquareChartProps) {
  const boxCount = Math.ceil(value / scaleValue);
  const maxSectionsWide = Math.floor(
    (maxWidth - BOX_STROKE_WIDTH * 2 + SECTION_PADDING) /
      (SECTION_SIZE_PX + SECTION_PADDING)
  );

  const sectionCount = Math.ceil(boxCount / BOXES_IN_SECTION);
  const sectionColumns = Math.min(maxSectionsWide, sectionCount);
  const sectionRows = Math.ceil(sectionCount / sectionColumns);

  const chartWidth =
    sectionColumns * SECTION_SIZE_PX +
    SECTION_PADDING * (sectionColumns - 1) +
    BOX_STROKE_WIDTH * 2;
  const chartHeight =
    sectionRows * SECTION_SIZE_PX +
    SECTION_PADDING * (sectionRows - 1) +
    BOX_STROKE_WIDTH * 2;

  const renderBoxes = (
    startX: number,
    startY: number,
    startBoxIndex: number,
    boxCount: number
  ) => {
    return [...Array(GROUP_SIZE)].map((e, boxRow) => {
      const groupY = startY + boxRow * (BOX_SIZE_PX + BOX_PADDING);

      return [...Array(GROUP_SIZE)].map((e, boxCol) => {
        const groupX = startX + boxCol * (BOX_SIZE_PX + BOX_PADDING);
        const boxIndex = startBoxIndex + boxRow * GROUP_SIZE + boxCol;

        if (boxIndex >= boxCount) {
          return null;
        }

        return (
          <Fragment key={boxIndex}>
            <rect
              fill={color}
              fillOpacity={0.2}
              stroke="#000"
              strokeWidth={BOX_STROKE_WIDTH}
              width={BOX_SIZE_PX}
              height={BOX_SIZE_PX}
              x={groupX}
              y={groupY}
              data-box-key={boxIndex}
            />
          </Fragment>
        );
      });
    });
  };

  const renderGroups = (
    startX: number,
    startY: number,
    startBoxIndex: number,
    boxCount: number
  ) => {
    return [...Array(SECTION_SIZE)].map((e, groupRow) => {
      const groupY = startY + groupRow * (GROUP_SIZE_PX + GROUP_PADDING);

      return [...Array(SECTION_SIZE)].map((e, groupCol) => {
        const groupX = startX + groupCol * (GROUP_SIZE_PX + GROUP_PADDING);
        const groupBoxIndex =
          startBoxIndex + (groupRow * SECTION_SIZE + groupCol) * BOXES_IN_GROUP;

        if (groupBoxIndex >= boxCount) {
          return null;
        }

        return (
          <Fragment key={groupBoxIndex}>
            <rect
              fill="none"
              width={GROUP_SIZE_PX}
              height={GROUP_SIZE_PX}
              x={groupX}
              y={groupY}
              data-group-key={groupBoxIndex}
            />
            {renderBoxes(groupX, groupY, groupBoxIndex, boxCount)}
          </Fragment>
        );
      });
    });
  };

  const renderSections = (startX: number, startY: number) => {
    return [...Array(sectionRows)].map((e, sectionRow) => {
      const sectionY =
        startY + sectionRow * (SECTION_SIZE_PX + SECTION_PADDING);

      return [...Array(sectionColumns)].map((e, sectionCol) => {
        const sectionX =
          startX + sectionCol * (SECTION_SIZE_PX + SECTION_PADDING);
        const sectionBoxIndex =
          (sectionRow * sectionColumns + sectionCol) * BOXES_IN_SECTION;

        if (sectionBoxIndex >= boxCount) {
          return null;
        }

        return (
          <Fragment key={sectionBoxIndex}>
            <rect
              fill="none"
              width={SECTION_SIZE_PX}
              height={SECTION_SIZE_PX}
              x={sectionX}
              y={sectionY}
              data-section-key={sectionBoxIndex}
            />
            {renderGroups(sectionX, sectionY, sectionBoxIndex, boxCount)}
          </Fragment>
        );
      });
    });
  };

  return (
    <figure className="SquareChart" style={{ minWidth }}>
      <figcaption>
        {label} (
        {numbro(value).format({
          thousandSeparated: true,
          mantissa: 0,
        })}
        )
      </figcaption>
      <svg width={chartWidth} height={chartHeight}>
        {renderSections(BOX_STROKE_WIDTH, BOX_STROKE_WIDTH)}
      </svg>
    </figure>
  );
}

export default SquareChart;
