import { useState } from "react";
import { NameInput } from "@/components/Auth/NameInput";
import { EmailInput } from "@/components/Auth/EmailInput";
import { PasswordInput } from "@/components/Auth/PasswordInput";
import { AuthFormFooter } from "@/components/Auth/AuthFormFooter";
import { toast } from "@/components/ui/sonner";
import { SubmitButton } from "@/components/SubmitButton";

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(name, email, password);
      toast.success("Conta criada com sucesso!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <NameInput value={name} onChange={setName} />
        <EmailInput value={email} onChange={setEmail} />
        <PasswordInput value={password} onChange={setPassword} />
      </div>
      <div className="flex flex-col space-y-4 mt-6">
        <SubmitButton
          label="Criar conta"
          loadingLabel="Criando conta..."
          loading={loading}
        />
        <AuthFormFooter
          text="Já tem uma conta?"
          linkText="Faça login"
          href="/login"
        />
      </div>
    </form>
  );
}
