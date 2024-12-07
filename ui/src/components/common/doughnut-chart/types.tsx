export interface DoughnutChartProps {
  height?: string;
  minHeight?: string;
  width?: string;
  centerContent?: React.ReactNode;
  progress: number;
  progressColors?: string[];
  labels?: string[];
}
