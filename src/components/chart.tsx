import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

// Enregistrer les composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Types
type Period = "Day" | "Week" | "Month" | "Year";

interface ChartProps {
  defaultPeriod?: Period;
}

interface StatsId {
  day?: number;
  week?: number;
  month?: number;
  year: number;
}

interface StatsItem {
  _id: StatsId;
  count: number;
}

interface StatsResponse {
  stats: StatsItem[];
}

// Composant principal
export default function ChartComponent({
  defaultPeriod = "Month",
}: ChartProps) {
  // États
  const [period, setPeriod] = useState<Period>(defaultPeriod);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      backgroundColor: string;
      tension: number;
      pointRadius: number;
      pointBackgroundColor: string;
      pointBorderColor: string;
      pointBorderWidth: number;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour formater les labels selon la période
  const formatLabel = (id: StatsId, period: Period): string => {
    switch (period) {
      case "Day": {
        // Format: "Lundi 22/10" ou "22/10/2025"
        const dateDay = new Date(id.year || 2025, (id.month || 1) - 1, id.day || 1);
        const dayName = dateDay.toLocaleDateString("fr-FR", { weekday: "short" });
        return `${dayName} ${id.day}/${id.month}`;
      }
      case "Week": {
        // Format: "Semaine 43"
        return `Sem ${id.week}`;
      }
      case "Month": {
        // Format: "Oct 2025"
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[(id.month || 1) - 1]} ${id.year}`;
      }
      case "Year": {
        // Format: "2025"
        return `${id.year}`;
      }
      default:
        return "N/A";
    }
  };

  // Charger les statistiques depuis l'API
  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Appeler l'API avec la période sélectionnée
        const stats = await axios.get(`/stats?period=${period}`);

        // Vérifier la structure de la réponse
        if (stats && typeof stats === "object" && "stats" in stats) {
          const statsData = (stats as StatsResponse).stats;

          // Extraire les labels et les données
          const labels = statsData.map((item) => formatLabel(item._id, period));
          const data = statsData.map((item) => item.count); // Nombre de tâches accomplies

          // Créer l'objet pour Chart.js
          setChartData({
            labels,
            datasets: [
              {
                label: "Tâches accomplies",
                data: data,
                fill: true,
                borderColor: "#ea580c",
                backgroundColor: "rgba(234, 88, 12, 0.1)",
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: "#ea580c",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
              },
            ],
          });
        }
      } catch (err) {
        console.error("Erreur lors du chargement des stats:", err);
        setError("Erreur lors de la récupération des statistiques");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [period]); // Recharger quand la période change

  // Gérer le changement de période
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPeriod(value as Period);
  };

  return (
    <div className="bg-white border-2 border-orange-300 rounded-2xl p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-orange-700 mb-4">
        Évolution des tâches accomplies
      </h2>

      {/* Sélecteur de période */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-orange-700 mb-2">
          Afficher par :
        </label>
        <select
          value={period}
          onChange={handlePeriodChange}
          className="border border-orange-400 bg-orange-50 rounded-lg p-2 focus:border-orange-700 focus:outline-none text-orange-700 font-medium"
        >
          <option value="Day">Par jour</option>
          <option value="Week">Par semaine</option>
          <option value="Month">Par mois</option>
          <option value="Year">Par année</option>
        </select>
      </div>

      {/* État de chargement */}
      {loading && (
        <div className="flex items-center justify-center h-64 bg-orange-50 rounded-lg">
          <p className="text-orange-600 font-semibold">Chargement des statistiques...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Graphique */}
      {chartData && !loading && (
        <div className="h-80 bg-gradient-to-b from-orange-50 to-white rounded-lg p-4">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: "#ea580c",
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                    usePointStyle: true,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: "#ea580c",
                    font: { weight: "bold" },
                  },
                  grid: {
                    color: "rgba(234, 88, 12, 0.1)",
                  },
                },
                x: {
                  ticks: {
                    color: "#ea580c",
                    font: { weight: "bold" },
                  },
                  grid: {
                    color: "rgba(234, 88, 12, 0.1)",
                  },
                },
              },
            }}
          />
        </div>
      )}

      {/* Aucune donnée */}
      {!chartData && !loading && !error && (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <p className="text-orange-700 font-semibold">Aucune donnée disponible pour le moment</p>
        </div>
      )}
    </div>
  );
}
