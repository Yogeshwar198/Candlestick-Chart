import React from "react";
import { Chart } from "react-google-charts";

export const CandlestickChart = ({ chartData, options, width = "100%", height = "600px" }) => (
  <div className="w-full max-w-6xl">
    <Chart
      chartType="CandlestickChart"
      width={width}
      height={height}
      data={chartData}
      options={options}
    />
  </div>
);