"use client";

import { useMemo } from "react";
import { University } from "@/types/university";
import {
  calculatePriority,
  getDaysUntilDeadline,
} from "@/utils/calculatePriority";

interface DeadlineTimelineProps {
  universities: University[];
}

export default function DeadlineTimeline({
  universities,
}: DeadlineTimelineProps) {
  const timelineData = useMemo(() => {
    // Group universities by deadline period
    const groups = {
      "November 2025": [] as University[],
      "December 2025": [] as University[],
      "January 2026": [] as University[],
      "February 2026": [] as University[],
      "March-April 2026": [] as University[],
      "May+ 2026": [] as University[],
    };

    universities.forEach((uni) => {
      const deadline = uni.applicationDeadline.toLowerCase();
      if (deadline.includes("nov")) {
        groups["November 2025"].push(uni);
      } else if (deadline.includes("dec")) {
        groups["December 2025"].push(uni);
      } else if (deadline.includes("jan")) {
        groups["January 2026"].push(uni);
      } else if (deadline.includes("feb")) {
        groups["February 2026"].push(uni);
      } else if (deadline.includes("mar") || deadline.includes("apr")) {
        groups["March-April 2026"].push(uni);
      } else {
        groups["May+ 2026"].push(uni);
      }
    });

    return Object.entries(groups).filter(([_, unis]) => unis.length > 0);
  }, [universities]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Application Deadline Timeline
      </h2>

      <div className="space-y-8">
        {timelineData.map(([period, unis], idx) => (
          <div key={period} className="relative">
            {/* Timeline Line */}
            {idx < timelineData.length - 1 && (
              <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-slate-200"></div>
            )}

            {/* Period Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {unis.length}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{period}</h3>
                <p className="text-sm text-slate-500">
                  {
                    unis.filter(
                      (u) => calculatePriority(u.applicationDeadline) === "High"
                    ).length
                  }{" "}
                  High Priority
                </p>
              </div>
            </div>

            {/* Universities */}
            <div className="ml-12 space-y-3">
              {unis.map((uni) => {
                const priority = calculatePriority(uni.applicationDeadline);
                const daysUntil = getDaysUntilDeadline(uni.applicationDeadline);

                return (
                  <div
                    key={uni.id}
                    className="p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold text-slate-900">
                            {uni.name}
                          </h4>
                          <span className="text-lg">
                            {getCountryFlag(uni.country)}
                          </span>
                          {priority === "High" && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded flex items-center gap-1">
                              ⭐ HIGH
                              {daysUntil !== null && daysUntil > 0 && (
                                <span className="opacity-75">
                                  ({daysUntil}d)
                                </span>
                              )}
                            </span>
                          )}
                          {priority === "Medium" && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded flex items-center gap-1">
                              🔶 MEDIUM
                              {daysUntil !== null && daysUntil > 0 && (
                                <span className="opacity-75">
                                  ({daysUntil}d)
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          {uni.programs.join(", ")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            📅 {uni.applicationDeadline}
                            {daysUntil !== null &&
                              daysUntil > 0 &&
                              daysUntil <= 7 && (
                                <span className="text-red-600 font-bold animate-pulse">
                                  ⚠️
                                </span>
                              )}
                          </span>
                          {uni.fundingType && (
                            <span className="text-xs text-slate-500">
                              💰 {uni.fundingType}
                            </span>
                          )}
                          {uni.visaDuration && (
                            <span className="text-xs text-slate-500">
                              🛂 {uni.visaDuration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">
          🎯 Priority Calculation Guide
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="font-semibold text-red-900 mb-1 flex items-center gap-1">
              ⭐ High Priority
            </p>
            <p className="text-red-700 text-xs">
              Less than 1 month remaining. Apply immediately!
            </p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="font-semibold text-yellow-900 mb-1 flex items-center gap-1">
              🔶 Medium Priority
            </p>
            <p className="text-yellow-700 text-xs">
              1-3 months remaining. Start preparing now.
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="font-semibold text-green-900 mb-1 flex items-center gap-1">
              🟢 Low Priority
            </p>
            <p className="text-green-700 text-xs">
              More than 3 months. Research and plan ahead.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center italic">
          💡 Priority updates automatically based on the current date
        </p>
      </div>
    </div>
  );
}

function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    USA: "🇺🇸",
    Canada: "🇨🇦",
    UK: "🇬🇧",
    Switzerland: "🇨🇭",
    Germany: "🇩🇪",
    Singapore: "🇸🇬",
    Australia: "🇦🇺",
    "South Korea": "🇰🇷",
  };
  return flags[country] || "🌍";
}
