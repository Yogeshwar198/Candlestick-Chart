import { useEffect } from 'react';

export const useWebSocket = (symbol, interval, onDataReceived) => {
  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);

    ws.onopen = () => {
      console.log(`Connected to Binance WebSocket for ${symbol} @ ${interval}`);
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const kline = messageData.k;

      if (kline && onDataReceived) {
        const formattedData = [
          new Date(kline.t), // Time
          parseFloat(kline.l), // Low
          parseFloat(kline.o), // Open
          parseFloat(kline.c), // Close
          parseFloat(kline.h), // High
        ];

        onDataReceived(formattedData);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval, onDataReceived]);
};