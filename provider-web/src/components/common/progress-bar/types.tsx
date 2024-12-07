import { SxProps, Theme } from "@mui/material";

export interface ProgressBarProps {
    progressUptime: number;
    progressHealth: number;
    llMinutes: number;
    ulMinutes: number;
    title?: string;
    uptimeLabel?: string;
    healthLabel?: string;
    llMinutesLabel?: string;
    ulMinutesLabel?: string;
    sx?: SxProps<Theme>;
} 