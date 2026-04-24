import { Option } from "@/types/common";

// input field props - Start --->
export interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute; // supports all input types
  name?: string;
  value?: string | number;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  className?: string;
}
// <----input field props - End

// select field props - Start --->
export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
}
// <----select field props - End

export interface OptionSelectProps {
  label?: string;
  required?: boolean;
  value?: number | string;
  options: {
    label: string;
    value: number | string;
  }[];

  onChange?: (value: any) => void;
  error?: string;
  className?: string;
}
