export const statusLabels: Record<string, string> = {
  todo: "En cours",
  done: "Validée",
  cancelled: "Annulée",
  overdue: "En retard",
};

export const categoryLabels: Record<string, { label: string; icon: string }> = {
  work: { label: "Travail", icon: "💼" },
  personal: { label: "Personnel", icon: "🏠" },
  shopping: { label: "Shopping", icon: "🛒" },
  health: { label: "Santé", icon: "❤️" },
  finance: { label: "Finance", icon: "💰" },
  others: { label: "Autres", icon: "⭐" },
};

export const priorityLabels: Record<string, string> = {
  low: "Basse",
  medium: "Moyenne",
  high: "Haute",
};

export const periodLabels: Record<string, string> = {
  Day: "Jour",
  Week: "Semaine",
  Month: "Mois",
  Year: "Année",
};
