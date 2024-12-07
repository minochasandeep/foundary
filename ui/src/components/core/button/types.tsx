import { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export interface ButtonProps extends Omit<MUIButtonProps,'title'> {
    title: string | React.ReactNode;
    endIcon?: React.ReactNode;
}
