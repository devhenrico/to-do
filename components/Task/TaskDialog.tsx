"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { taskService, Task, CreateTaskData } from "@/lib/tasks";
import { toast } from "@/components/ui/sonner";
import { USE_OFFLINE_MODE } from "@/lib/config";

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

export function TaskDialog({ open, onClose, task }: TaskDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    totalPomodori: 4,
    pomodoroValue: 25,
    completedPomodori: 0,
    status: "pending",
    taskDate: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        totalPomodori: task.totalPomodori,
        pomodoroValue: task.pomodoroValue,
        completedPomodori: task.completedPomodori,
        status: task.status || "pending",
        taskDate: task.taskDate || "",
        dueDate: task.dueDate || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        totalPomodori: 4,
        pomodoroValue: 25,
        completedPomodori: 0,
        status: "pending",
        taskDate: "",
        dueDate: "",
      });
    }
  }, [task, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (USE_OFFLINE_MODE) {
        // Modo offline: Usar localStorage
        const storedTasks = localStorage.getItem("tasks");
        const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

        if (task) {
          // Atualizar tarefa existente
          const index = tasks.findIndex((t) => t.id === task.id);
          if (index !== -1) {
            tasks[index] = { ...task, ...formData };
            localStorage.setItem("tasks", JSON.stringify(tasks));
            toast.success("Tarefa atualizada com sucesso");
          }
        } else {
          // Criar nova tarefa
          const newTask: Task = {
            id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
            ...formData,
            completedPomodori: formData.completedPomodori || 0,
            createdAt: new Date().toISOString(),
          };
          tasks.push(newTask);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          toast.success("Tarefa criada com sucesso");
        }

        // Disparar evento para atualizar lista na página
        window.dispatchEvent(new Event("tasks-updated"));
      } else {
        // Modo com backend: Usar API
        if (task) {
          await taskService.update(task.id, formData);
          toast.success("Tarefa atualizada com sucesso");
        } else {
          await taskService.create(formData);
          toast.success("Tarefa criada com sucesso");
        }
        // Disparar evento para atualizar lista na página
        window.dispatchEvent(new Event("tasks-updated"));
      }

      onClose();
    } catch (error: unknown) {
      let message = "Erro ao salvar tarefa";
      if (error instanceof Error) {
        message = error.message;
      } else if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        message = String(error.response.data.message);
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>{task ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
          <DialogDescription>
            {task
              ? "Atualize os dados da tarefa"
              : "Preencha os dados para criar uma nova tarefa"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="rounded-xl resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalPomodori">Total de Pomodoros *</Label>
                <Input
                  id="totalPomodori"
                  type="number"
                  min="1"
                  value={formData.totalPomodori}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalPomodori: parseInt(e.target.value) || 1,
                    })
                  }
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pomodoroValue">Duração (min) *</Label>
                <Input
                  id="pomodoroValue"
                  type="number"
                  min="1"
                  value={formData.pomodoroValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pomodoroValue: parseInt(e.target.value) || 1,
                    })
                  }
                  className="rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="taskDate">Data da Tarefa</Label>
                <Input
                  id="taskDate"
                  type="date"
                  value={formData.taskDate}
                  onChange={(e) =>
                    setFormData({ ...formData, taskDate: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Data de Vencimento</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="pending">Pendente</option>
                <option value="in_progress">Em Progresso</option>
                <option value="completed">Concluída</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
            {task && (
              <div className="grid gap-2">
                <Label htmlFor="completedPomodori">Pomodoros Completos</Label>
                <Input
                  id="completedPomodori"
                  type="number"
                  min="0"
                  max={formData.totalPomodori}
                  value={formData.completedPomodori}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      completedPomodori: parseInt(e.target.value) || 0,
                    })
                  }
                  className="rounded-xl"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="rounded-xl cursor-pointer"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-xl cursor-pointer"
              disabled={loading}
            >
              {loading ? "Salvando..." : task ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
