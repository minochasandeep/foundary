import { Control, UseFormRegisterReturn } from "react-hook-form";

export interface FormSelectProps {
  label?: string;
  name: string;
  control: Control<any>;
  disabled?: boolean;
  options: any[];
  labelField?: string;
  valueField?: string;
}
