import { SxProps, Theme } from "@mui/material";

export interface SliderBarProps {
    setPoint: number;
    handleChange: (event: Event, value: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    title?: string;
    lowerLimitLabel?: string;
    setPointLabel?: string;
    upperLimitLabel?: string;
    lowerLimitCount?: number;
    sx?: SxProps<Theme>;
}