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
import { getFundingColor } from "@/constants/ui";
import { CountryFlag } from "@/components/CountryFlag";
import {
  Target,
  Microscope,
  Calendar,
  DollarSign,
  Home,
  GraduationCap,
  Clock,
  Plane,
  ChevronDown,
  ChevronUp,
  FileText,
  Award,
  AlertTriangle,
} from "lucide-react";

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const priority = calculatePriority(university.applicationDeadline);
  const daysUntil = getDaysUntilDeadline(university.applicationDeadline);
  const priorityConfig = PRIORITY_CONFIG[priority];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-brrom-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-bl-full"></div>
        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {university.qsLogo && !logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={university.qsLogo}
                  alt={`${university.name} logo`}
                  className="w-12 h-12 object-contain rounded-lg border border-slate-200 bg-white p-1 shrink-0"
                  onError={() => {
                    console.error(
                      `Failed to load logo for ${university.name}:`,
                      university.qsLogo
                    );
                    setLogoError(true);
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-linear-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-slate-400 dark:text-slate-300" />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {university.name}
                </h3>
                {university.qsRank && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      🏆 QS Rank #{university.qsRank}
                    </span>
                    {university.qsScore && (
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        Score: {university.qsScore}
                      </span>
                    )}
                  </div>
                )}
              </div>
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
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getFundingColor(
                    university.fundingType
                  )}`}
                >
                  💰 {university.fundingType}
                </span>
              )}
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-linear-to-r from-slate-100 to-slate-200 text-slate-700 shadow-sm flex items-center gap-1.5">
                <CountryFlag country={university.country} width={20} />
                {university.country}
              </span>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" /> Programs
          </h4>
          <div className="flex flex-wrap gap-2">
            {university.programs.map((program, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-700"
              >
                {program}
              </span>
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <Microscope className="w-4 h-4" /> Research Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {university.researchAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-linear-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-700"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Application Deadline
              {isVeryUrgent(daysUntil) && (
                <span title="Very urgent!" className="inline-block">
                  <AlertTriangle className="w-3 h-3 animate-pulse text-red-600" />
                </span>
              )}
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
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
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              Tuition (Per Year)
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {university.tuitionPerYear}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <Home className="w-3 h-3" />
              Living Cost (Per Year)
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {university.livingCostPerYear}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              TOEFL/IELTS Min
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {university.toeflIeltsMin}
            </p>
          </div>
        </div>

        {/* Visa Info */}
        {university.visaType && (
          <div className="mb-4 p-4 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mb-1 flex items-center gap-1">
                  <Plane className="w-3 h-3" /> Post-Study Visa
                </p>
                <p className="text-sm text-indigo-900 dark:text-indigo-300 font-semibold">
                  {university.visaType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mb-1 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" /> Duration
                </p>
                <p className="text-lg text-indigo-900 dark:text-indigo-300 font-bold">
                  {university.visaDuration}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-4 text-sm font-bold text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less Details
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More Details
            </>
          )}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
            {/* GRE Requirement */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                GRE Required?
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {university.greRequired}
              </p>
            </div>

            {/* Key Documents */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Key Documents
              </h4>
              <div className="flex flex-wrap gap-2">
                {university.keyDocuments.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-sm"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                University Scholarships
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {university.scholarships}
              </p>
            </div>

            {/* Notes */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Important Notes
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {university.notes}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
