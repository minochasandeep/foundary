
import { UseFormRegisterReturn } from 'react-hook-form';

 export interface FormInputProps {
    label: string;
    placeholder: string;
    name: string;
    register: UseFormRegisterReturn;
    errorMessage?: string;
    endAdornmentIcon?: React.ReactNode;
}
