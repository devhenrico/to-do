import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Task } from "@/lib/tasks";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (task: Task) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}: TaskCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "completed":
        return "Concluída";
      case "in_progress":
        return "Em progresso";
      case "cancelled":
        return "Cancelada";
      default:
        return "Pendente";
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="mb-0.5 truncate text-sm sm:mb-1 sm:text-base">
              {task.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-xs sm:text-xs">
              {task.description || "Sem descrição"}
            </CardDescription>
          </div>
          <button
            onClick={() => onToggleStatus(task)}
            className="ml-0 shrink-0 cursor-pointer sm:ml-2"
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="h-4 w-4 text-green-600 sm:h-5 sm:w-5" />
            ) : (
              <Circle className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex flex-col gap-0.5 text-xs sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground">Pomodoros:</span>
            <span className="font-medium">
              {task.completedPomodori} / {task.totalPomodori}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-xs sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground">Duração:</span>
            <span className="font-medium">{task.pomodoroValue} min</span>
          </div>
          {task.taskDate && (
            <div className="flex flex-col gap-0.5 text-xs sm:flex-row sm:items-center sm:justify-between">
              <span className="text-muted-foreground">Data da Tarefa:</span>
              <span className="font-medium">
                {new Date(task.taskDate).toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}
          {task.dueDate && (
            <div className="flex flex-col gap-0.5 text-xs sm:flex-row sm:items-center sm:justify-between">
              <span className="text-muted-foreground">Vencimento:</span>
              <span className="font-medium">
                {new Date(task.dueDate).toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}
          <div className="mt-2.5 flex flex-col gap-1.5 sm:mt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <span
              className={`w-fit rounded-full px-2 py-0.5 text-xs ${getStatusColor(
                task.status,
              )}`}
            >
              {getStatusLabel(task.status)}
            </span>
            <div className="flex gap-1 sm:gap-2">
              <Button
                className="h-7 w-7 cursor-pointer sm:h-8 sm:w-8"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(task)}
              >
                <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button
                className="h-7 w-7 cursor-pointer sm:h-8 sm:w-8"
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="text-destructive h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
