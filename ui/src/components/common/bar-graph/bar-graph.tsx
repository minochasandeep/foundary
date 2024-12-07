import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";

import { BarGraphProps } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarGraph: React.FC<BarGraphProps> = ({
  labels,
  data,
  height,
  minHeight,
  width,
  title,
}) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        display: false,
      },
      title: {
        display: title ? true : false,
        text: title,
      },
    },
  };

  // const chartDataset: ChartDataset<"bar">[] = data.map((dataset, index) => {
  //   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //   return {
  //     label: `Dataset ${index + 1}`,
  //     data: dataset,
  //     backgroundColor: `#${randomColor}`,
  //   };
  // });

  const chartData: ChartData<"bar"> = {
    labels: labels,
    datasets: data,
  };

  return (
    <Box sx={{ minHeight, height, width }} paddingBottom="8px">
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default BarGraph;
