interface Stat {
  label: string;
  value: string;
  change: string;
  color: string;
}

interface DashboardStatsProps {
  stats?: Stat[];
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const defaultStats: Stat[] = [
    { label: "Total Projects", value: "0", change: "+0 this month", color: "bg-blue-50 text-blue-600" },
    { label: "Total Leads", value: "0", change: "+0 this week", color: "bg-green-50 text-green-600" },
    { label: "Pending Reviews", value: "0", change: "Needs attention", color: "bg-yellow-50 text-yellow-600" },
  ];

  const data = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.color}`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
