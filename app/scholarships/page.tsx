"use client";

import Navigation from "@/components/Navigation";
import { scholarships } from "@/data/scholarships";
import { Scholarship } from "@/types/scholarship";
import {
  SCHOLARSHIP_STRATEGY_NOTE,
  SCHOLARSHIP_SECTIONS,
  COMPARISON_COLUMNS,
  getBestForText,
  formatBooleanCell,
} from "@/constants/scholarships";
import {
  DollarSign,
  GraduationCap,
  Briefcase,
  AlertTriangle,
  Check,
  FileText,
  Calendar,
} from "lucide-react";

export default function ScholarshipsPage() {
  const freshGradScholarships = scholarships.filter((s) => s.forFreshGrads);
  const workExpScholarships = scholarships.filter((s) => !s.forFreshGrads);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
        {/* Header */}
        <header className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg flex items-center gap-3">
              <DollarSign className="w-10 h-10" />
              Scholarship Guide for Thai Students
            </h1>
            <p className="text-blue-100 dark:text-blue-200 text-lg">
              Major international scholarships and funding opportunities
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Strategic Note */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-700 p-6 rounded-r-lg mb-8 transition-colors">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {SCHOLARSHIP_STRATEGY_NOTE.title.replace("⚠️ ", "")}
            </h3>
            <p className="text-amber-800 dark:text-amber-200 mb-3">
              {
                SCHOLARSHIP_STRATEGY_NOTE.warning.split(
                  "mandatory return-to-home-country clauses"
                )[0]
              }
              <strong>mandatory return-to-home-country clauses</strong>
              {
                SCHOLARSHIP_STRATEGY_NOTE.warning.split(
                  "mandatory return-to-home-country clauses"
                )[1]
              }
            </p>
            <div className="space-y-2 text-sm text-amber-900 dark:text-amber-200">
              <p>
                <strong>
                  {SCHOLARSHIP_STRATEGY_NOTE.recommendations.title}
                </strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                {SCHOLARSHIP_STRATEGY_NOTE.recommendations.options.map(
                  (option, idx) => (
                    <li key={idx}>{option}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* For Fresh Graduates */}
          <section className="mb-12">
            <div
              className={`flex items-center gap-3 mb-6 p-4 bg-gradient-to-r ${SCHOLARSHIP_SECTIONS.freshGrads.bgGradient} dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl border ${SCHOLARSHIP_SECTIONS.freshGrads.borderColor} dark:border-emerald-800`}
            >
              <GraduationCap className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />
              <div>
                <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                  {SCHOLARSHIP_SECTIONS.freshGrads.title}
                </h2>
                <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {SCHOLARSHIP_SECTIONS.freshGrads.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freshGradScholarships.map((scholarship, idx) => (
                <ScholarshipCard key={idx} scholarship={scholarship} />
              ))}
            </div>
          </section>

          {/* For Experienced Professionals */}
          <section>
            <div
              className={`flex items-center gap-3 mb-6 p-4 bg-gradient-to-r ${SCHOLARSHIP_SECTIONS.experienced.bgGradient} dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl border ${SCHOLARSHIP_SECTIONS.experienced.borderColor} dark:border-blue-800`}
            >
              <Briefcase className="w-10 h-10 text-blue-700 dark:text-blue-400" />
              <div>
                <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                  {SCHOLARSHIP_SECTIONS.experienced.title}
                </h2>
                <p className="text-blue-700 dark:text-blue-400 font-medium">
                  {SCHOLARSHIP_SECTIONS.experienced.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workExpScholarships.map((scholarship, idx) => (
                <ScholarshipCard key={idx} scholarship={scholarship} />
              ))}
            </div>
          </section>

          {/* Comparison Matrix */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Quick Comparison Matrix
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-700 border-b-2 border-slate-300 dark:border-slate-600">
                    <tr>
                      {COMPARISON_COLUMNS.map((col) => (
                        <th
                          key={col.key}
                          className={`px-4 py-3 text-${col.align} font-semibold text-slate-900 dark:text-slate-100`}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {scholarships.map((s, idx) => {
                      const workExpCell = formatBooleanCell(
                        s.workExpRequired,
                        "workExp"
                      );
                      const returnReqCell = formatBooleanCell(
                        s.returnRequirement,
                        "returnReq"
                      );

                      return (
                        <tr
                          key={idx}
                          className={
                            idx % 2 === 0
                              ? "bg-white dark:bg-slate-800"
                              : "bg-slate-50 dark:bg-slate-800/50"
                          }
                        >
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                            {s.name}
                          </td>
                          <td className="px-4 py-3 text-slate-800 dark:text-slate-200 font-medium">
                            {s.country}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={workExpCell.colorClass}>
                              {workExpCell.text}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={returnReqCell.colorClass}>
                              {returnReqCell.text}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                            <span className="text-xs font-medium">
                              {getBestForText(s.returnRequirement)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {scholarship.name}
          </h3>
          {scholarship.returnRequirement && (
            <span className="px-3 py-1 bg-red-50 text-red-900 border border-red-300 dark:bg-red-900/40 dark:text-red-200 dark:border-red-700 text-xs font-bold rounded-full shadow-sm">
              Return Required
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-800 dark:to-blue-700 text-blue-900 dark:text-blue-200 text-xs font-bold rounded-lg shadow-sm border border-blue-300 dark:border-blue-700">
            {scholarship.country}
          </span>
          <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 text-slate-900 dark:text-slate-200 text-xs font-bold rounded-lg shadow-sm border border-slate-300 dark:border-slate-600">
            {scholarship.targetDegree}
          </span>
        </div>
      </div>

      {/* Coverage */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4" /> Coverage
        </h4>
        <ul className="space-y-1">
          {scholarship.coverage.map((item, idx) => (
            <li
              key={idx}
              className="text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2"
            >
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Key Conditions */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Key Conditions
        </h4>
        <ul className="space-y-1">
          {scholarship.keyConditions.map((condition, idx) => (
            <li
              key={idx}
              className="text-sm text-slate-700 dark:text-slate-200 flex items-start"
            >
              <span className="text-slate-500 dark:text-slate-400 mr-2">•</span>
              {condition}
            </li>
          ))}
        </ul>
      </div>

      {/* Deadline */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <strong>Typical Deadline:</strong> {scholarship.deadlineNote}
        </p>
      </div>
    </div>
  );
}
