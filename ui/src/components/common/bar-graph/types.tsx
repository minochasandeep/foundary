import { ChartDataset } from "chart.js";

export interface BarGraphProps {
  height?: string;
  minHeight?: string;
  width?: string;
  data: ChartDataset<"bar">[];
  labels?: string[];
  title?: string;
}

export interface ChartLegendProps {
  color?: string;
  text: string;
  colorBoxRadius?: string;
}
