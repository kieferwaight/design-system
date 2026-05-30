import {
  Input as AriaInput,
  FieldError,
  Label,
  Text,
  TextArea,
  TextField,
} from "react-aria-components";
import { cn } from "@/lib/cn";
import type { InputProps } from "./input.types";

export function Input({
  placeholder,
  label,
  description,
  errorMessage,
  className,
  multiline = false,
  rows = 3,
  style,
  type = "text",
  ...rest
}: InputProps) {
  return (
    <TextField className={cn("flex flex-col gap-1.5 w-full", className)} style={style} {...rest}>
      {label && (
        <Label className="text-xs font-semibold text-fg-secondary select-none leading-none pl-0.5">
          {label}
        </Label>
      )}

      <div className="relative flex items-center w-full">
        {multiline ? (
          <TextArea
            rows={rows}
            placeholder={placeholder}
            className={cn(
              "w-full px-[var(--space-3)] py-[var(--space-2)] text-sm text-fg placeholder:text-fg-tertiary bg-bg-sunken",
              "border border-separator rounded-[var(--radius-layer-5)] outline-none resize-none",
              "transition-all duration-150 ease-out",
              "data-[hovered]:border-fg-tertiary",
              "data-[focused]:border-accent data-[focused]:ring-2 data-[focused]:ring-accent-subtle",
              "data-[invalid]:border-danger data-[invalid]:ring-2 data-[invalid]:ring-danger/20",
              "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
            )}
          />
        ) : (
          <AriaInput
            type={type}
            placeholder={placeholder}
            className={cn(
              "w-full h-[36px] px-[var(--space-3)] text-sm text-fg placeholder:text-fg-tertiary bg-bg-sunken",
              "border border-separator rounded-[var(--radius-layer-5)] outline-none",
              "transition-all duration-150 ease-out",
              "data-[hovered]:border-fg-tertiary",
              "data-[focused]:border-accent data-[focused]:ring-2 data-[focused]:ring-accent-subtle",
              "data-[invalid]:border-danger data-[invalid]:ring-2 data-[invalid]:ring-danger/20",
              "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
            )}
          />
        )}
      </div>

      {description && !errorMessage && (
        <Text slot="description" className="text-3xs text-fg-tertiary pl-0.5">
          {description}
        </Text>
      )}

      {errorMessage && (
        <FieldError className="text-3xs text-danger font-medium pl-0.5">{errorMessage}</FieldError>
      )}
    </TextField>
  );
}
