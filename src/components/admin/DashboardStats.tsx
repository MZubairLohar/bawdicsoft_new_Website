"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FolderKanban,
  Users,
  ClipboardCheck,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

interface Stat {
  label: string;
  value: string;
  change: string;
  color: string; // tailwind gradient classes
  icon?: string; // optional icon identifier
}

interface DashboardStatsProps {
  stats?: Stat[];
}

// Icon resolver for flexibility
const iconMap: Record<string, React.ReactNode> = {
  projects: <FolderKanban className="h-3.5 w-3.5" />,
  leads: <Users className="h-3.5 w-3.5" />,
  pending: <ClipboardCheck className="h-3.5 w-3.5" />,
};

// Fallback card theme palette (gradient + glow + icon color)
const cardThemes = [
  {
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    glow: "bg-sky-400",
    iconBg: "bg-white/20",
    icon: "projects",
    changeIcon: <TrendingUp className="h-3 w-3" />,
  },
  {
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    glow: "bg-emerald-400",
    iconBg: "bg-white/20",
    icon: "leads",
    changeIcon: <TrendingUp className="h-3 w-3" />,
  },
  {
    gradient: "from-amber-500 via-orange-500 to-rose-600",
    glow: "bg-amber-400",
    iconBg: "bg-white/20",
    icon: "pending",
    changeIcon: <ClipboardCheck className="h-3 w-3" />,
  },
];

// Animated counting value
function CountUp({ value }: { value: string }) {
  const target = parseInt(value, 10) || 0;
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const duration = 1200;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);

  return <span>{display.toLocaleString()}</span>;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const defaultStats: Stat[] = [
    {
      label: "Total Projects",
      value: "0",
      change: "+0 this month",
      color: "from-sky-500 via-blue-600 to-indigo-700",
      icon: "projects",
    },
    {
      label: "Total Leads",
      value: "0",
      change: "+0 this week",
      color: "from-emerald-500 via-green-600 to-teal-700",
      icon: "leads",
    },
    {
      label: "Pending Reviews",
      value: "0",
      change: "Needs attention",
      color: "from-amber-500 via-orange-500 to-rose-600",
      icon: "pending",
    },
  ];

  const data = stats && stats.length ? stats : defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {data.map((stat, idx) => {
        const theme = cardThemes[idx % cardThemes.length];
        const iconNode = iconMap[stat.icon || theme.icon] || iconMap[theme.icon];
        return (
          <motion.div
            key={`${stat.label}-${idx}`}
            initial={{ opacity: 0, y: 40, rotateX: -12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="perspective-1000"
          >
            <div className="relative">
              {/* Glow halo */}
              <div
                className={`absolute -inset-2 rounded-3xl ${theme.glow} opacity-30 blur-xl animate-glow`}
              />
              {/* 3D card */}
              <div
                className={`relative rounded-3xl p-5 md:p-6 bg-gradient-to-br ${stat.color} text-white shadow-xl overflow-hidden card-gloss transform transition-transform duration-300 hover:rotate-1 hover:scale-[1.02]`}
              >
                {/* Decorative rotating ring */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-4 border-white/20 animate-slow-spin" />
                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-white/10 blur-xl animate-float" />

                <div className="flex items-start justify-between relative">
                  <div>
                    <p className="text-sm font-medium text-white/85">{stat.label}</p>
                    <h3 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight drop-shadow">
                      <CountUp value={stat.value} />
                    </h3>
                  </div>
                  <div className={`p-3 rounded-2xl ${theme.iconBg} backdrop-blur-sm ring-1 ring-white/30`}>
                    {iconNode}
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold ring-1 ring-white/30">
                  {theme.changeIcon}
                  {stat.change}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
