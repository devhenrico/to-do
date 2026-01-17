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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{task.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {task.description || "Sem descrição"}
            </CardDescription>
          </div>
          <button
            onClick={() => onToggleStatus(task)}
            className="ml-2 cursor-pointer"
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pomodoros:</span>
            <span className="font-medium">
              {task.completedPomodori} / {task.totalPomodori}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Duração:</span>
            <span className="font-medium">{task.pomodoroValue} min</span>
          </div>
          {task.taskDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Data da Tarefa:</span>
              <span className="font-medium">
                {new Date(task.taskDate).toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Vencimento:</span>
              <span className="font-medium">
                {new Date(task.dueDate).toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                task.status,
              )}`}
            >
              {getStatusLabel(task.status)}
            </span>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
