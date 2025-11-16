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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg flex items-center gap-3">
              <DollarSign className="w-10 h-10" />
              Scholarship Guide for Thai Students
            </h1>
            <p className="text-blue-100 text-lg">
              Major international scholarships and funding opportunities
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Strategic Note */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {SCHOLARSHIP_STRATEGY_NOTE.title.replace("⚠️ ", "")}
            </h3>
            <p className="text-amber-800 mb-3">
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
            <div className="space-y-2 text-sm text-amber-900">
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
              className={`flex items-center gap-3 mb-6 p-4 bg-gradient-to-r ${SCHOLARSHIP_SECTIONS.freshGrads.bgGradient} rounded-2xl border ${SCHOLARSHIP_SECTIONS.freshGrads.borderColor}`}
            >
              <GraduationCap className="w-10 h-10 text-emerald-700" />
              <div>
                <h2
                  className={`text-3xl font-bold bg-gradient-to-r ${SCHOLARSHIP_SECTIONS.freshGrads.gradient} bg-clip-text text-transparent`}
                >
                  {SCHOLARSHIP_SECTIONS.freshGrads.title}
                </h2>
                <p className="text-emerald-700 font-medium">
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
              className={`flex items-center gap-3 mb-6 p-4 bg-gradient-to-r ${SCHOLARSHIP_SECTIONS.experienced.bgGradient} rounded-2xl border ${SCHOLARSHIP_SECTIONS.experienced.borderColor}`}
            >
              <Briefcase className="w-10 h-10 text-blue-700" />
              <div>
                <h2
                  className={`text-3xl font-bold bg-gradient-to-r ${SCHOLARSHIP_SECTIONS.experienced.gradient} bg-clip-text text-transparent`}
                >
                  {SCHOLARSHIP_SECTIONS.experienced.title}
                </h2>
                <p className="text-blue-700 font-medium">
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Quick Comparison Matrix
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {COMPARISON_COLUMNS.map((col) => (
                        <th
                          key={col.key}
                          className={`px-4 py-3 text-${col.align} font-semibold text-slate-900`}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
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
                          className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {s.name}
                          </td>
                          <td className="px-4 py-3 text-slate-700">
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
                          <td className="px-4 py-3 text-slate-700">
                            <span className="text-xs">
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
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-900">
            {scholarship.name}
          </h3>
          {scholarship.returnRequirement && (
            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full shadow-sm">
              Return Required
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-bold rounded-lg shadow-sm">
            {scholarship.country}
          </span>
          <span className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-sm">
            {scholarship.targetDegree}
          </span>
        </div>
      </div>

      {/* Coverage */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4" /> Coverage
        </h4>
        <ul className="space-y-1">
          {scholarship.coverage.map((item, idx) => (
            <li
              key={idx}
              className="text-sm text-slate-600 flex items-start gap-2"
            >
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Key Conditions */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Key Conditions
        </h4>
        <ul className="space-y-1">
          {scholarship.keyConditions.map((condition, idx) => (
            <li key={idx} className="text-sm text-slate-600 flex items-start">
              <span className="text-slate-400 mr-2">•</span>
              {condition}
            </li>
          ))}
        </ul>
      </div>

      {/* Deadline */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <strong>Typical Deadline:</strong> {scholarship.deadlineNote}
        </p>
      </div>
    </div>
  );
}
