import React, { useState, useCallback, useMemo } from "react";
import { Dropdown } from "./Dropdown";
import { useWebSocket } from "./WebSocketHandler";
import { CandlestickChart } from "./ChartComponent";

const DEFAULT_DATA = [["Time", "Low", "Open", "Close", "High"]];

const cryptocurrencies = [
  { label: "ETH/USDT", value: "ETHUSDT" },
  { label: "BNB/USDT", value: "BNBUSDT" },
  { label: "DOT/USDT", value: "DOTUSDT" },
  // Easily add more options here
];

const intervals = [
  { label: "1 Minute", value: "1m" },
  { label: "3 Minutes", value: "3m" },
  { label: "5 Minutes", value: "5m" },
  // Easily add more intervals here
];

const chartOptions = {
  legend: "none",
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // Red for falling candles
    risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // Green for rising candles
  },
  bar: {
    width: 15, // Adjusted for clearer and larger candlestick width
  },
  hAxis: {
    format: "HH:mm",
    gridlines: {
      count: 15,
    },
  },
};

const TradingViewChart = () => {
  const [symbol, setSymbol] = useState(cryptocurrencies[0].value);
  const [interval, setInterval] = useState(intervals[0].value);
  const [chartData, setChartData] = useState(DEFAULT_DATA);

  // UseCallback ensures the data update function isn't recreated on every render
  const handleDataReceived = useCallback(
    (newData) => {
      setChartData((prevData) => {
        const updatedData = [...prevData, newData];
        return updatedData.slice(-50); // Limit to last 50 points
      });
    },
    [setChartData]
  );

  // UseMemo ensures the chartData isn't recalculated unless necessary
  const displayedChartData = useMemo(() => chartData, [chartData]);

  // Setup WebSocket connection with a hook
  useWebSocket(symbol, interval, handleDataReceived);

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Candlestick Chart</h1>

      {/* Dropdowns for Cryptocurrency and Interval */}
      <div className="flex flex-row justify-between w-full max-w-md space-x-4">
        <Dropdown
          label="Select Cryptocurrency"
          options={cryptocurrencies}
          value={symbol}
          onChange={(e) => {
            setSymbol(e.target.value);
            setChartData(DEFAULT_DATA); // Reset chart data when switching
          }}
        />
        <Dropdown
          label="Select Interval"
          options={intervals}
          value={interval}
          onChange={(e) => {
            setInterval(e.target.value);
            setChartData(DEFAULT_DATA); // Reset chart data when switching
          }}
        />
      </div>

      {/* Candlestick Chart */}
      <CandlestickChart chartData={displayedChartData} options={chartOptions} />
    </div>
  );
};

export default TradingViewChart;