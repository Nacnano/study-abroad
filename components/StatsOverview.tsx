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
        color="bg-blue-50 text-blue-700 border-blue-200"
      />
      <StatCard
        label="High Priority"
        value={stats.highPriority.toString()}
        icon={Star}
        color="bg-red-50 text-red-700 border-red-200"
      />
      <StatCard
        label="Fully Funded"
        value={stats.fullyFunded.toString()}
        icon={DollarSign}
        color="bg-emerald-50 text-emerald-700 border-emerald-200"
      />
      <StatCard
        label="Countries"
        value={stats.countries.toString()}
        icon={Globe}
        color="bg-purple-50 text-purple-700 border-purple-200"
      />
      <StatCard
        label="Urgent (Nov-Dec)"
        value={upcomingDeadlines.toString()}
        icon={Clock}
        color="bg-orange-50 text-orange-700 border-orange-200"
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
      className={`bg-white rounded-lg shadow-sm border p-4 ${color} hover:shadow-md transition-shadow`}
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
