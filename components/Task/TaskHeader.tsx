import { Button } from "@/components/ui/button";
import { LogOut, Logs } from "lucide-react";
import { User } from "@/lib/auth";

interface TaskHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function TaskHeader({ user, onLogout }: TaskHeaderProps) {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl">
      <div className="bg-white border rounded-2xl shadow-sm px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logs className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Olá, {user?.name || "usuário"}</span>
          <Button
            variant="outline"
            className="cursor-pointer rounded-xl"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
