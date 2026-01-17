import { UserRound } from "lucide-react";
import { FormInput } from "@/components/FormInput";

interface NameInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
}

export function NameInput({
  id = "name",
  value,
  onChange,
  placeholder = "Seu nome",
  required = true,
  label = "Nome",
}: NameInputProps) {
  return (
    <FormInput
      id={id}
      label={label}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      icon={UserRound}
    />
  );
}
