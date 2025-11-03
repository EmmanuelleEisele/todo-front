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
import {
  fetchTasksByDay,
  fetchTasksByWeek,
  fetchTasksByMonth,
  fetchTasksByYear,
} from "../types/statsApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


type Period = "Day" | "Week" | "Month" | "Year";

interface DayStat {
  _id: { year: number; month: number; day: number };
  count: number;
}
interface WeekStat {
  _id: { year: number; week: number };
  count: number;
}
interface MonthStat {
  _id: { year: number; month: number };
  count: number;
}
interface YearStat {
  _id: { year: number };
  count: number;
}

const monthNames = [
  "Jan",
  "Fév",
  "Mars",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sept",
  "Oct",
  "Nov",
  "Déc",
];

function getDateRange(start: Date, end: Date) {
  const dates = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}


export default function ChartComponent() {
  const [period, setPeriod] = useState<Period>("Day");
  const [stats, setStats] = useState<DayStat[] | WeekStat[] | MonthStat[] | YearStat[]>([]);

  useEffect(() => {
    if (period === "Day") fetchTasksByDay().then((data) => setStats(data as DayStat[]));
    else if (period === "Week") fetchTasksByWeek().then((data) => setStats(data as WeekStat[]));
    else if (period === "Month") fetchTasksByMonth().then((data) => setStats(data as MonthStat[]));
    else if (period === "Year") fetchTasksByYear().then((data) => setStats(data as YearStat[]));
  }, [period]);

  if (stats.length === 0) return <div>Aucune donnée</div>;

  let labels: string[] = [];
  let data: number[] = [];

  if (period === "Day") {
    const dayStats = stats as DayStat[];
    const allDates = getDateRange(
      new Date(dayStats[0]._id.year, dayStats[0]._id.month - 1, dayStats[0]._id.day),
      new Date(
        dayStats[dayStats.length - 1]._id.year,
        dayStats[dayStats.length - 1]._id.month - 1,
        dayStats[dayStats.length - 1]._id.day
      )
    );
    labels = allDates.map(
      (d) => `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`
    );
    data = allDates.map((d) => {
      const found = dayStats.find(
        (s) =>
          s._id.year === d.getFullYear() &&
          s._id.month === d.getMonth() + 1 &&
          s._id.day === d.getDate()
      );
      return found ? found.count : 0;
    });
  } else if (period === "Week") {
    const weekStats = stats as WeekStat[];
    labels = weekStats.map((s) => `S${s._id.week} ${s._id.year}`);
    data = weekStats.map((s) => s.count);
  } else if (period === "Month") {
    const monthStats = stats as MonthStat[];
    labels = monthStats.map(
      (s) => `${monthNames[(s._id.month || 1) - 1]} ${s._id.year}`
    );
    data = monthStats.map((s) => s.count);
  } else if (period === "Year") {
    const yearStats = stats as YearStat[];
    labels = yearStats.map((s) => `${s._id.year}`);
    data = yearStats.map((s) => s.count);
  }

  const chartData: import('chart.js').ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: "Tâches terminées ces 30 derniers jours",
        data,
        borderColor: "#ea580c", // couleur de la ligne (orange)
        backgroundColor: "rgba(234, 88, 12, 0.15)", // couleur sous la ligne
        pointBackgroundColor: "#ea580c", // couleur des points
        pointRadius: 5,
        fill: true ,
        tension: 0.3,
      },
    ],
  };

  const options: import('chart.js').ChartOptions<'line'> = {
    animations: {
      tension: {
        duration: 2000,
        easing: 'linear',
        from: 0.1,
        to: 0.5,
        loop: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ea580c',
          font: { weight: 700, size: 12 },
          boxWidth: 12,
          padding: 10,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ea580c',
          font: { weight: 700, size: 11 },
        },
        grid: { color: 'rgba(234, 88, 12, 0.2)' },
      },
      y: {
        min: 0,
        max: Math.max(...data) + 1,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#ea580c',
          font: { size: 12 },
          callback: function (tickvalue: string | number) {
            return Number.isInteger(tickvalue) ? tickvalue : null;
          },
        },
        grid: { color: 'rgba(234, 88, 12, 0.2)' },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value as Period)}
        className="bg-white border-2 p-2 border-orange-300 rounded-lg font-sans mb-3 "
      >
        <option value="Day" aria-label="Jour">Jour</option>
        <option value="Week" aria-label="Semaine">Semaine</option>
        <option value="Month" aria-label="Mois">Mois</option>
        <option value="Year" aria-label="Année">Année</option>
      </select>
      <Line className="bg-white rounded-lg sm:rounded-2xl p-0.5 sm:p-4 overflow-scroll" data={chartData} options={options} />
    </div>
  );
}
