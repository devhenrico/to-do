"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AuthCard } from "@/components/Auth/AuthCard";
import { RegisterForm } from "@/components/Auth/RegisterForm";

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirecionar se já estiver autenticado
  if (isAuthenticated) {
    router.push("/tasks");
    return null;
  }

  const handleRegisterSubmit = async (
    name: string,
    email: string,
    password: string,
  ) => {
    await register(name, email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <AuthCard
        title="Registrar"
        description="Crie uma conta para começar a gerenciar suas tarefas"
      >
        <RegisterForm onSubmit={handleRegisterSubmit} />
      </AuthCard>
    </div>
  );
}
