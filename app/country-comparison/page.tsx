"use client";

import Link from "next/link";
import { countryInfo } from "@/data/universities";
import Navigation from "@/components/Navigation";

export default function CountryComparison() {
  const countries = Object.values(countryInfo);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
                  🌍 Country Comparison
                </h1>
                <p className="text-blue-100 text-lg">
                  Compare visa policies, job markets, and strategic advantages
                </p>
              </div>
              <Link
                href="/"
                className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ← Back to Universities
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                      Country
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                      Visa Program
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                      Job Market
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                      Strategic Verdict
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {countries.map((country, idx) => (
                    <tr
                      key={country.name}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {getCountryFlag(country.name)}
                          </span>
                          <span className="font-semibold text-slate-900">
                            {country.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {country.visaProgram}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                          {country.visaDuration}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 max-w-xs">
                        {country.jobMarketOutlook}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 max-w-md">
                        {country.strategicVerdict}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Analysis Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {countries.map((country) => (
              <div
                key={country.name}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">
                    {getCountryFlag(country.name)}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {country.name}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="text-lg">🛂</span> Post-Study Visa
                    </h4>
                    <p className="text-sm text-blue-800 font-medium">
                      {country.visaProgram}
                    </p>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-xs font-bold shadow-sm">
                        Duration: {country.visaDuration}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                    <h4 className="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-2">
                      <span className="text-lg">💼</span> Job Market Outlook
                    </h4>
                    <p className="text-sm text-emerald-800 font-medium">
                      {country.jobMarketOutlook}
                    </p>
                  </div>

                  <div className="pt-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                      <span className="text-lg">💡</span> Strategic Verdict
                    </h4>
                    <p className="text-sm text-purple-800 font-medium italic">
                      {country.strategicVerdict}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Insights */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-8 shadow-xl">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              🎯 Key Insights for Thai Students
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-emerald-900 mb-2 text-lg">
                  ✅ Best for Work & PR
                </h4>
                <p className="text-sm text-slate-700">
                  <strong>Canada & Germany:</strong> Clear pathways to permanent
                  residency with generous work permits (3 years for Canada, 18
                  months for Germany).
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2">
                  💰 Best Value
                </h4>
                <p className="text-sm text-slate-700">
                  <strong>Germany:</strong> Free tuition at public universities
                  with strong job market and path to EU Blue Card.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  🏆 Most Prestigious
                </h4>
                <p className="text-sm text-slate-700">
                  <strong>USA & UK:</strong> Home to world's top AI labs but
                  requires significant financial investment for MS programs.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">
                  ⚠️ Most Challenging
                </h4>
                <p className="text-sm text-slate-700">
                  <strong>Switzerland & Singapore:</strong> Excellent education
                  but difficult visa/work sponsorship for
                  non-EU/high-salary-threshold requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function getCountryFlag(countryName: string): string {
  const flags: Record<string, string> = {
    "United States": "🇺🇸",
    Canada: "🇨🇦",
    "United Kingdom": "🇬🇧",
    Switzerland: "🇨🇭",
    Germany: "🇩🇪",
    Singapore: "🇸🇬",
    Australia: "🇦🇺",
    "South Korea": "🇰🇷",
  };
  return flags[countryName] || "🌍";
}
