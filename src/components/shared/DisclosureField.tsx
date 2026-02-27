import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FieldType } from "@/schemas/gri";

interface DisclosureFieldProps {
  name: string;
  code: string;
  label: string;
  fieldType: FieldType;
  required?: boolean;
  options?: string[];
  unit?: string;
}

export function DisclosureField({
  name,
  code,
  label,
  fieldType,
  required,
  options,
  unit,
}: DisclosureFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid || undefined}>
          <FieldLabel>
            <span className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground font-normal">
                GRI {code}
                {required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </span>
              <span>{label}</span>
            </span>
          </FieldLabel>

          {fieldType === "textarea" && (
            <Textarea
              {...field}
              value={field.value ?? ""}
              rows={3}
              placeholder={`Enter ${label.toLowerCase()}...`}
              aria-invalid={fieldState.invalid || undefined}
            />
          )}

          {fieldType === "text" && (
            <Input
              {...field}
              value={field.value ?? ""}
              type="text"
              placeholder={`Enter ${label.toLowerCase()}...`}
              aria-invalid={fieldState.invalid || undefined}
            />
          )}

          {fieldType === "number" && (
            <div className="flex items-center gap-2">
              <Input
                {...field}
                value={field.value ?? ""}
                type="number"
                placeholder="0"
                className="flex-1"
                aria-invalid={fieldState.invalid || undefined}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val === "" ? "" : val);
                }}
              />
              {unit && (
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {unit}
                </span>
              )}
            </div>
          )}

          {fieldType === "select" && options && (
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={fieldState.invalid || undefined}
              >
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {fieldType === "boolean" && (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid || undefined}
              />
              <span className="text-sm text-muted-foreground">Yes</span>
            </div>
          )}

          {fieldState.error && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  );
}
