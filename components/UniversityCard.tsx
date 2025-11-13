"use client";

import { useState } from "react";
import { University } from "@/types/university";

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    High: "bg-red-100 text-red-800 border-red-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Low: "bg-green-100 text-green-800 border-green-200",
  };

  const fundingColors = {
    "Fully Funded": "bg-emerald-100 text-emerald-800",
    "Limited Funding": "bg-amber-100 text-amber-800",
    "Self-Funded": "bg-rose-100 text-rose-800",
    Mixed: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-slate-900">
                {university.name}
              </h3>
              <span className="text-2xl">
                {getCountryFlag(university.country)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  priorityColors[university.priority]
                }`}
              >
                {university.priority} Priority
              </span>
              {university.fundingType && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    fundingColors[university.fundingType]
                  }`}
                >
                  {university.fundingType}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {university.country}
              </span>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">
            Programs
          </h4>
          <div className="flex flex-wrap gap-2">
            {university.programs.map((program, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
              >
                {program}
              </span>
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">
            Research Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {university.researchAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Application Deadline</p>
            <p className="text-sm font-semibold text-slate-900">
              {university.applicationDeadline}
            </p>
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
          <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-600 font-semibold mb-1">
                  Post-Study Visa
                </p>
                <p className="text-sm text-indigo-900">{university.visaType}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-600 font-semibold mb-1">
                  Duration
                </p>
                <p className="text-sm text-indigo-900 font-semibold">
                  {university.visaDuration}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {isExpanded ? "▲ Show Less" : "▼ Show More Details"}
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
