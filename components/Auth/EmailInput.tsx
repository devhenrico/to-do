import { Mail } from "lucide-react";
import { FormInput } from "@/components/FormInput";

interface EmailInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
}

export function EmailInput({
  id = "email",
  value,
  onChange,
  placeholder = "seu@email.com",
  required = true,
  label = "Email",
}: EmailInputProps) {
  return (
    <FormInput
      id={id}
      label={label}
      type="email"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      icon={Mail}
    />
  );
}
