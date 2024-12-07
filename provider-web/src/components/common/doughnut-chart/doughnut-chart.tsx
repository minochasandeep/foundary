import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { DoughnutChartProps } from "./types";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  progress = 63,
  progressColors = ["#3CCC0E", "#eaeffc"],
  labels = ["Test"],
  height = "300px",
  width = "300px",
  centerContent,
}) => {
  const chartData: ChartData<"doughnut"> = {
    labels: labels,
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: progressColors,
        borderWidth: 0,
      },
    ],
  };
  return (
    <Box sx={{ height, width }} paddingBottom="8px" position="relative">
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw}%`;
                },
              },
            },
          },
          cutout: "70%",
        }}
      />
      {centerContent && (
        <Box
          sx={{
            position: "absolute",
            top: "48%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            height: "50%",
            width: "50%",
          }}
        >
          {centerContent}
        </Box>
      )}
    </Box>
  );
};

export default DoughnutChart;
