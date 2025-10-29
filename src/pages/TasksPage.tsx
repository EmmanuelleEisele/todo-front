import { useEffect, useState } from "react";
import type { Task } from "../types/todoApi";
import apiClient from "../types/todoApi";
import CategorySelect from "../components/CategorySelect";
import TaskList from "../components/TaskList";
import {
  categoryLabels,
  priorityLabels,
  periodLabels,
} from "../constants/labels";
import Button from "../components/ui/Button";
import { Flame, PlusIcon } from "lucide-react";

export default function TasksPage() {
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState<Partial<Task>>({});
  const [categories, setCategories] = useState<
    Array<{ _id: string; name: string; label: string; icon: string }>
  >([]);

  async function getAllTasks() {
    const response = await apiClient.get("/tasks/");
    return response.data.data; // tableau de tâches
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
    // Récupère les catégories dynamiquement
    apiClient
      .get("/categories/")
      .then((res) => {
        console.log(
          "Réponse brute catégories backend:",
          res.data.data || res.data
        );
        const cats = (res.data.data || res.data).map(
          (cat: { _id: string; name: string }) => {
            const fusion = {
              _id: cat._id,
              name: cat.name,
              label: categoryLabels[cat.name]?.label || cat.name,
              icon: categoryLabels[cat.name]?.icon || "❓",
            };
            console.log("Fusion catégorie:", fusion);
            return fusion;
          }
        );
        setCategories(cats);
        console.log("Liste finale des catégories:", cats);
      })
      .catch(() => setCategories([]));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "task-filtre") {
      console.log("Changement filtre catégorie:", value);
      setFilterCategory(value);
    } else {
      setFormData((prev) => {
        const newForm = { ...prev, [name]: value };
        console.log("Changement formData:", newForm);
        return newForm;
      });
    }
  }
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.title || !formData.period || !formData.categoryId) {
      alert("Le titre, la période et la catégorie sont obligatoires");
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
      await apiClient.put(`/tasks/${id}`, {
        isDone: !task.isDone,
      });
      // Recharge la liste complète pour synchroniser les catégories
      const tasksUpdated = await getAllTasks();
      setTasks(tasksUpdated);
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

      {/* Formulaire de création de tâche */}
      <form
        id="task-form"
        action="submit"
        onSubmit={handleCreate}
        className="flex flex-col w-fit sm:w-1/2 mx-auto gap-2 font-sans bg-white border-2 border-orange-300 rounded-2xl p-4 mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-1">
          <span className="text-orange-800">*</span>
          <label htmlFor="task-categories">
            <CategorySelect
              name="categoryId"
              categories={categories.map((cat) => ({
                key: cat._id,
                label: cat.label,
                icon: cat.icon,
              }))}
              value={formData.categoryId || ""}
              onChange={handleChange}
              className="bg-white border-2 p-2 border-orange-300 rounded-lg font-sans"
              required
            />
          </label>
          <label htmlFor="task-period" />
          <span className="text-orange-800">*</span>
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
          <span className="text-orange-800">*</span>
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
          placeholder="* Ajouter le titre de votre tâche avant la fin du monde..."
          required
        />
        <Button
          type="submit"
          className="flex gap-2 items-center justify-center w-fit"
        >
          <PlusIcon size={15} /> Ajouter
        </Button>
        <span className="text-orange-800 text-[0.7rem]">* Ces champs sont obligatoires</span>
      </form>
      {/*Filtres des tâches */}
      <div className="flex flex-col items-center justify-center gap-4 mb-6 sm:flex-row">
        {/* Filtre des tâches par catégories */}
        <div>
          <label
            htmlFor="task-filtre"
            className="block mb-2 text-orange-700 font-sans"
          >
            Filtrer par catégorie :
          </label>
          <select
            name="task-filtre"
            id="task-filtre"
            value={filterCategory}
            onChange={handleChange}
            className="font-sans bg-white border-2 border-orange-300 rounded-xl p-2 placeholder:text-orange-600 focus:outline-none"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>
        {/*Filtre des tâches par statuts */}
        <div>
          {(() => {
            const statusLabels: Record<string, string> = {
              todo: "À faire",
              done: "Validée",
              cancelled: "Annulée",
              overdue: "En retard",
            };
            const uniqueStatus = Array.from(
              new Set(tasks.map((t) => t.status))
            );
            return (
              <div>
                <label
                  htmlFor="task-status-filtre"
                  className="block mb-2 text-orange-700 font-sans"
                >
                  Filtrer par statut :
                </label>
                <select
                  name="task-status-filtre"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="font-sans bg-white border-2 border-orange-300 rounded-xl p-2 placeholder:text-orange-600 focus:outline-none"
                >
                  <option value="">Tous les statuts</option>
                  {uniqueStatus.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status] || status}
                    </option>
                  ))}
                </select>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Liste des tâches ou message si aucune */}
      {(() => {
        const filteredTasks = tasks.filter((t) => {
          const catId =
            typeof t.categoryId === "object" && t.categoryId !== null
              ? (t.categoryId as any)._id
              : t.categoryId;
          const catMatch = !filterCategory || catId === filterCategory;
          const statusMatch = !filterStatus || t.status === filterStatus;
          return catMatch && statusMatch;
        });
        return filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center font-sans text-orange-600 my-8">
            <Flame size={30} /> Aucune tâche. Profitez de la fin du monde ! 🎉
          </div>
        ) : (
          <ul className="mx-auto max-w-2xl font-sans">
            <TaskList
              tasks={filteredTasks}
              categories={categories}
              onToggle={toggleTaskCompletion}
              onDelete={deleteTask}
            />
          </ul>
        );
      })()}
    </div>
  );
}
