"use client";

import { University } from "@/types/university";
import { calculatePriority } from "@/utils/calculatePriority";
import { GraduationCap, Star, DollarSign, Globe, Clock } from "lucide-react";

interface StatsOverviewProps {
  universities: University[];
}

export default function StatsOverview({ universities }: StatsOverviewProps) {
  const stats = {
    total: universities.length,
    highPriority: universities.filter(
      (u) => calculatePriority(u.applicationDeadline) === "High"
    ).length,
    fullyFunded: universities.filter((u) => u.fundingType === "Fully Funded")
      .length,
    countries: new Set(universities.map((u) => u.country)).size,
  };

  const upcomingDeadlines = universities.filter((u) => {
    const deadline = u.applicationDeadline.toLowerCase();
    return deadline.includes("nov") || deadline.includes("dec");
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        label="Total Universities"
        value={stats.total.toString()}
        icon={GraduationCap}
        color="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
      />
      <StatCard
        label="High Priority"
        value={stats.highPriority.toString()}
        icon={Star}
        color="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
      />
      <StatCard
        label="Fully Funded"
        value={stats.fullyFunded.toString()}
        icon={DollarSign}
        color="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
      />
      <StatCard
        label="Countries"
        value={stats.countries.toString()}
        icon={Globe}
        color="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
      />
      <StatCard
        label="Urgent (Nov-Dec)"
        value={upcomingDeadlines.toString()}
        icon={Clock}
        color="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-4 ${color} hover:shadow-md transition-all`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium opacity-80 mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-70" />
      </div>
    </div>
  );
}
