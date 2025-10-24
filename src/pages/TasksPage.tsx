import { useEffect, useState } from "react";
import type { Category, Task } from "../types/todoApi";
import apiClient from "../types/todoApi";
import Button from "../components/ui/Button";
import { PlusIcon } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Partial<Task>>({});

  // Traduction des statuts
  const statusLabels: Record<string, string> = {
    todo: "En cours",
    done: "Validée",
    cancelled: "Annulée",
    overdue: "En retard",
  };

  // Traduction des priorités
  const priorityLabels: Record<string, string> = {
    low: "Basse",
    medium: "Moyenne",
    high: "Haute",
  };

  // Traduction des périodes
  const periodLabels: Record<string, string> = {
    Day: "Jour",
    Week: "Semaine",
    Month: "Mois",
    Year: "Année",
  };

  async function getAllTasks() {
    const response = await apiClient.get("/tasks/");
    return response.data.data; // tableau de tâches
  }

  async function getAllCategories() {
    const response = await apiClient.get("/categories/");
    return response.data.data || response.data; // tableau de catégories
  }

  async function deleteTask(id: string) {
    try {
      await apiClient.delete(`/tasks/${id}`);
      // Réinitialiser les tâches après suppression
      const tasks = await getAllTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
      alert("Erreur lors de la suppression de la tâche");
    }
  }
  useEffect(() => {
    getAllTasks().then(setTasks);
    getAllCategories()
      .then(setCategories)
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories :", error);
        setCategories([]); // Catégories vides par défaut
      });
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.title || !formData.period) {
      alert("Le titre et la période sont obligatoires");
      return;
    }
    try {
      const response = await apiClient.post("/tasks", formData);
      console.log("Réponse de la création de tâche :", response.data);
      // Réinitialiser le formulaire
      setFormData({});
      // Recharger la liste des tâches
      const tasks = await getAllTasks();
      setTasks(tasks);
    } catch (error) {
      const err = error as Record<string, unknown>;
      const hasResponse =
        typeof err.response === "object" && err.response !== null;

      if (hasResponse) {
        const responseData = (err.response as Record<string, unknown>).data;
        console.error("Erreur backend :", responseData);
        const message =
          typeof responseData === "object" && responseData !== null
            ? (responseData as Record<string, unknown>).message ||
              (responseData as Record<string, unknown>).error ||
              "Erreur API"
            : "Erreur API";
        alert("Erreur API : " + message);
      } else {
        console.error("Erreur lors de la création de la tâche :", error);
      }
    }
  }
  async function toggleTaskCompletion(id: string) {
    const task = tasks.find((task) => task._id === id);
    if (!task) return;

    try {
      const response = await apiClient.put(`/tasks/${id}`, {
        isDone: !task.isDone,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === id ? response.data.data : t))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
      alert("Erreur lors de la mise à jour de la tâche");
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-orange-700 font-sans p-4 mt-8">
        Mes Tâches
      </h1>
      <form
        id="task-form"
        action="submit"
        onSubmit={handleCreate}
        className="flex flex-col w-1/2 mx-auto gap-2 font-sans"
      >
        <div  className="flex gap-2">
          <label htmlFor="task-categories">
            <select
              name="categoryId"
              id="task-categories"
              className="bg-white border-2 p-2 border-orange-300 rounded-lg font-sans"
              onChange={handleChange}
              value={formData.categoryId || ""}
            >
              <option value="" className="">
                Categorie
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="task-period" />
          <select
            id="task-period"
            name="period"
            required
            value={formData.period || ""}
            onChange={handleChange}
            className="bg-white border-2 p-2 border-orange-300 rounded-lg font-sans w-fit"
          >
            <option value="">Période</option>
            {Object.entries(periodLabels).map(([key, label]) => (
              <option key={key} value={key.toLowerCase()}>
                {label}
              </option>
            ))}
          </select>
          <label htmlFor="task-deadline" />
          <input
            type="date"
            id="task-deadline"
            name="deadline"
            className=" bg-white border-2 border-orange-300 rounded-lg p-2 font-sans w-fit focus:outline-none focus:ring-2 focus:ring-orange-600/50"
            onChange={handleChange}
            value={formData.deadline || ""}
          />
        <label htmlFor="priority" />
        <select
          id="priority"
          name="priority"
          required
          value={formData.priority}
          onChange={handleChange}
          className="bg-white border-2 border-orange-300 rounded-xl p-2 focus:outline-none w-fit"
        >
          <option value="">Priorité</option>
          {["low", "medium", "high"].map((level) => (
            <option key={level} value={level}>
              {priorityLabels[level]}
            </option>
          ))}
        </select>
        </div>

        <label htmlFor="task-title" />
        <input
          type="text"
          id="task-title"
          name="title"
          onChange={handleChange}
          value={formData.title || ""}
          className=" bg-white border-2 border-orange-300 rounded-xl p-2 placeholder:text-orange-600 focus:outline-none"
          placeholder="Ajouter une tâche avant la fin du monde..."
          required
        />
        <Button
          type="submit"
          className="flex gap-2 items-center justify-center w-fit"
        >
          <PlusIcon size={15} /> Ajouter
        </Button>
      </form>

      <p className="mx-auto text-center mt-4">Liste des tâches :</p>
      <ul className="mx-auto max-w-4xl">
        {tasks.map((task, index) => (
          <li
            key={task._id || `task-${index}`}
            className="bg-white border-2 border-orange-300 rounded-2xl p-4 mb-2"
          >
            <p>
              {task.title} - {statusLabels[task.status]} -{" "}
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString("fr-FR")
                : ""}
            </p>
            <input
              type="checkbox"
              onChange={() => toggleTaskCompletion(task._id)}
              className="mr-2"
              checked={task.isDone}
            />

            <button onClick={() => deleteTask(task._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
