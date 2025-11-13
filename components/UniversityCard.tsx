"use client";

import { useState } from "react";
import { University } from "@/types/university";
import {
  calculatePriority,
  getDaysUntilDeadline,
} from "@/utils/calculatePriority";
import {
  PRIORITY_CONFIG,
  getUrgencyColor,
  isVeryUrgent,
  formatDaysRemaining,
} from "@/constants/priorities";
import { FUNDING_COLORS, getCountryFlag } from "@/constants/ui";

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priority = calculatePriority(university.applicationDeadline);
  const daysUntil = getDaysUntilDeadline(university.applicationDeadline);
  const priorityConfig = PRIORITY_CONFIG[priority];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full"></div>
        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">
                {getCountryFlag(university.country)}
              </span>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {university.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${priorityConfig.badgeColor}`}
                title={
                  daysUntil !== null
                    ? `${daysUntil} days remaining`
                    : "Unknown deadline"
                }
              >
                {priorityConfig.icon} {priorityConfig.label}
                {daysUntil !== null && daysUntil > 0 && (
                  <span className="ml-1 opacity-75">({daysUntil}d)</span>
                )}
              </span>
              {university.fundingType && (
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                    FUNDING_COLORS[university.fundingType]
                  }`}
                >
                  💰 {university.fundingType}
                </span>
              )}
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 shadow-sm">
                📍 {university.country}
              </span>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <span className="text-lg">🎯</span> Programs
          </h4>
          <div className="flex flex-wrap gap-2">
            {university.programs.map((program, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
              >
                {program}
              </span>
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <span className="text-lg">🔬</span> Research Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {university.researchAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-lg text-sm font-medium border border-purple-200"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
              Application Deadline
              {isVeryUrgent(daysUntil) && (
                <span
                  className="animate-pulse text-red-600"
                  title="Very urgent!"
                >
                  ⚠️
                </span>
              )}
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {university.applicationDeadline}
            </p>
            {daysUntil !== null && daysUntil > 0 && (
              <p
                className={`text-xs mt-1 font-medium ${getUrgencyColor(
                  daysUntil
                )}`}
              >
                {formatDaysRemaining(daysUntil)}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Tuition (Per Year)</p>
            <p className="text-sm font-semibold text-slate-900">
              {university.tuitionPerYear}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">
              Living Cost (Per Year)
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {university.livingCostPerYear}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">TOEFL/IELTS Min</p>
            <p className="text-sm font-semibold text-slate-900">
              {university.toeflIeltsMin}
            </p>
          </div>
        </div>

        {/* Visa Info */}
        {university.visaType && (
          <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-600 font-bold mb-1 flex items-center gap-1">
                  <span>🛂</span> Post-Study Visa
                </p>
                <p className="text-sm text-indigo-900 font-semibold">
                  {university.visaType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-600 font-bold mb-1 flex items-center justify-end gap-1">
                  <span>⏱️</span> Duration
                </p>
                <p className="text-lg text-indigo-900 font-bold">
                  {university.visaDuration}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          {isExpanded ? "▲ Show Less Details" : "▼ Show More Details"}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
            {/* GRE Requirement */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                GRE Required?
              </h4>
              <p className="text-sm text-slate-600">{university.greRequired}</p>
            </div>

            {/* Key Documents */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                Key Documents
              </h4>
              <div className="flex flex-wrap gap-2">
                {university.keyDocuments.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                University Scholarships
              </h4>
              <p className="text-sm text-slate-600">
                {university.scholarships}
              </p>
            </div>

            {/* Notes */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                Important Notes
              </h4>
              <p className="text-sm text-slate-600">{university.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
