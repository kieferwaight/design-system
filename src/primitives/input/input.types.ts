import type { ReactNode } from "react";
import type {
  CheckboxProps as AriaCheckboxProps,
  SearchFieldProps as AriaSearchFieldProps,
  SwitchProps as AriaSwitchProps,
  TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";

export interface InputProps extends Omit<AriaTextFieldProps, "children" | "className" | "style"> {
  /** Optional placeholder text. */
  placeholder?: string;
  /** Optional form field label. */
  label?: string;
  /** Optional form field description. */
  description?: string;
  /** Optional error message displayed when isInvalid is true. */
  errorMessage?: string;
  /** Custom class name for wrapping container. */
  className?: string;
  /** If true, renders a textarea element instead of a standard text input. */
  multiline?: boolean;
  /** Number of rows to render when multiline is true. */
  rows?: number;
  /** Custom inline style. */
  style?: React.CSSProperties;
  /** Standard input type (text, email, password, tel, number). Defaults to "text". */
  type?: string;
}

export interface SearchInputProps
  extends Omit<AriaSearchFieldProps, "className" | "children" | "style"> {
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  /** Dynamic total count of search results, shown on the right when input is active. */
  liveCount?: number;
  className?: string;
}

export interface SwitchProps extends Omit<AriaSwitchProps, "className" | "style"> {
  className?: string;
  children?: ReactNode;
}

export interface CheckboxProps extends Omit<AriaCheckboxProps, "className" | "style"> {
  className?: string;
  children?: ReactNode;
}
