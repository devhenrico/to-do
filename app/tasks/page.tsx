"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from "@/contexts/AuthContext";
import { taskService, Task } from "@/lib/tasks";
import { toast } from "@/components/ui/sonner";
import { USE_OFFLINE_MODE } from "@/lib/config";
import { TaskDialog } from "@/components/Task/TaskDialog";
import { TaskHeader } from "@/components/Task/TaskHeader";
import { TaskMain } from "@/components/Task/TaskMain";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { logout, user } = useAuth();
  const router = useRouter();

  const loadTasks = async () => {
    try {
      if (USE_OFFLINE_MODE) {
        // Modo offline: Usar localStorage
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } else {
        // Modo com backend: Usar API
        const data = await taskService.getAll();
        setTasks(data);
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao carregar tarefas",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();

    // Listener para atualizar tarefas quando o dialog salvar
    const handleTasksUpdated = () => {
      loadTasks();
    };

    window.addEventListener("tasks-updated", handleTasksUpdated);
    return () => {
      window.removeEventListener("tasks-updated", handleTasksUpdated);
    };
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    try {
      if (USE_OFFLINE_MODE) {
        // Modo offline: Usar localStorage
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          const tasks: Task[] = JSON.parse(storedTasks);
          const updatedTasks = tasks.filter((t) => t.id !== id);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
          setTasks(updatedTasks);
          toast.success("Tarefa excluída com sucesso");
        }
      } else {
        // Modo com backend: Usar API
        await taskService.delete(id);
        toast.success("Tarefa excluída com sucesso");
        loadTasks();
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao excluir tarefa",
      );
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingTask(null);
    loadTasks();
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      if (USE_OFFLINE_MODE) {
        // Modo offline: Usar localStorage
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          const tasks: Task[] = JSON.parse(storedTasks);
          const updatedTasks = tasks.map((t) =>
            t.id === task.id ? { ...t, status: newStatus } : t,
          );
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
          setTasks(updatedTasks);
          toast.success("Status atualizado");
        }
      } else {
        // Modo com backend: Usar API
        await taskService.patch(task.id, { status: newStatus });
        toast.success("Status atualizado");
        loadTasks();
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar status",
      );
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    // <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <TaskHeader user={user} onLogout={handleLogout} />

      <TaskMain
        tasks={tasks}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onCreateTask={handleCreate}
      />

      <TaskDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        task={editingTask}
      />
    </div>
    // </ProtectedRoute>
  );
}
