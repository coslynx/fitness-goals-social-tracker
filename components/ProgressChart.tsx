"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/utils/store";
import { LineController, LineElement } from "chart.js";
import { Chart } from "react-chartjs-2";

interface ProgressChartProps {
  goalId: string;
  goalName: string;
  targetValue: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId, goalName, targetValue }) => {
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string }[] } | null>(null);
  const store = useStore();

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch(`/api/progress/${goalId}`);
        if (response.ok) {
          const data = await response.json();
          setChartData({
            labels: data.map((item: any) => item.date.slice(0, 10)),
            datasets: [
              {
                label: goalName,
                data: data.map((item: any) => item.value),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
              },
            ],
          });
        } else {
          console.error("Error fetching progress data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgressData();
  }, [goalId, goalName]);

  if (!chartData) {
    return <div>Loading progress chart...</div>;
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: targetValue * 1.2,
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Chart
        type="line"
        data={chartData}
        options={options}
        plugins={[
          {
            id: "targetLine",
            afterDraw: (chart) => {
              const ctx = chart.ctx;
              const { y: targetY } = chart.scales.y.getPixelForValue(targetValue);

              ctx.save();
              ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(0, targetY);
              ctx.lineTo(chart.width, targetY);
              ctx.stroke();
              ctx.restore();
            },
          },
        ]}
      />
    </div>
  );
};

export default ProgressChart;