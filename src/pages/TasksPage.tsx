import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { taskService } from "../services/taskService";
import type { Task, CreateTask } from "../types/todoApi";
import {
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]); // Initialisation explicite avec un tableau vide
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // États pour le formulaire de création
  const [newTask, setNewTask] = useState<CreateTask>({
    title: "",
    description: "",
    status: "en cours",
    deadline: "",
  });

  // Charger les données utilisateur et tâches au montage
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Vérifier l'authentification
        if (!authService.isAuthenticated()) {
          navigate("/login");
          return;
        }

        // Récupérer les tâches
        const userTasks = await taskService.getAllTasks();
        setTasks(userTasks);
      } catch (err: unknown) {
        console.error("Erreur lors du chargement du dashboard:", err);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  // Créer une nouvelle tâche
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdTask = await taskService.createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setNewTask({
        title: "",
        description: "",
        status: "en cours",
        deadline: "",
      });
      setShowCreateForm(false);
    } catch (err: unknown) {
      console.error("Erreur lors de la création:", err);
      setError("Erreur lors de la création de la tâche");
    }
  };

  // Supprimer une tâche
  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err: unknown) {
      console.error("Erreur lors de la suppression:", err);
      setError("Erreur lors de la suppression de la tâche");
    }
  };

  // Changer le statut d'une tâche
  const handleStatusChange = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, {
        status: newStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err: unknown) {
      console.error("Erreur lors de la mise à jour:", err);
      setError("Erreur lors de la mise à jour du statut");
    }
  };

  // Fonction pour obtenir l'icône selon le statut
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "validé":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "annulé":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "en retard":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-orange-600" />;
    }
  };

  // Fonction pour obtenir la couleur selon le statut
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "validé":
        return "bg-green-100 text-green-800 border-green-200";
      case "annulé":
        return "bg-red-100 text-red-800 border-red-200";
      case "en retard":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-116px)]">
        <div className="text-lg text-orange-700">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-116px)] bg-gradient-to-b from-orange-50 to-orange-100 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-orange-700 mb-2">
                Mes Tâches
              </h1>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nouvelle tâche
            </button>
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Formulaire de création */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">
              Créer une nouvelle tâche
            </h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-orange-700 mb-1"
                >
                  Titre *
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-orange-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  rows={3}
                />
              </div>
              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-orange-700 mb-1"
                >
                  Date limite
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={newTask.deadline}
                  onChange={(e) =>
                    setNewTask({ ...newTask, deadline: e.target.value })
                  }
                  className="border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Créer
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des tâches */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">
            Mes tâches
          </h2>

          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune tâche pour le moment.</p>
              <p className="text-sm">
                Créez votre première tâche en cliquant sur "Nouvelle tâche" !
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-4 ${getStatusColor(
                    task.status
                  )}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-semibold">{task.title}</h3>
                      </div>
                      {task.description && (
                        <p className="text-sm mb-2">{task.description}</p>
                      )}
                      {task.deadline && (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Échéance:{" "}
                            {new Date(task.deadline).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {/* Sélecteur de statut */}
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task.id,
                            e.target.value as Task["status"]
                          )
                        }
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                      >
                        <option value="en cours">En cours</option>
                        <option value="validé">Validé</option>
                        <option value="annulé">Annulé</option>
                        <option value="en retard">En retard</option>
                      </select>

                      {/* Bouton supprimer */}
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
