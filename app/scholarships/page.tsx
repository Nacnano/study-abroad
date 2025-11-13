"use client";

import Navigation from "@/components/Navigation";

interface Scholarship {
  name: string;
  country: string;
  targetDegree: string;
  workExpRequired: boolean;
  coverage: string[];
  keyConditions: string[];
  returnRequirement: boolean;
  deadlineNote: string;
  forFreshGrads: boolean;
}

export default function ScholarshipsPage() {
  const scholarships: Scholarship[] = [
    {
      name: "Fulbright Thai Graduate Scholarship (TGS)",
      country: "USA",
      targetDegree: "Master's or Doctoral",
      workExpRequired: false,
      coverage: [
        "Full tuition",
        "Monthly stipend",
        "Health insurance",
        "Travel costs",
      ],
      keyConditions: [
        "Thai citizen",
        "GPA >3.0 (MS) or >3.5 (PhD)",
        "J-1 visa (2-year home residency rule, waivers possible)",
      ],
      returnRequirement: false,
      deadlineNote: "Typically May-June for following year",
      forFreshGrads: true,
    },
    {
      name: "Chevening Scholarship",
      country: "UK",
      targetDegree: "1-Year Master's only",
      workExpRequired: true,
      coverage: [
        "Full tuition",
        "Monthly stipend",
        "Travel costs",
        "Arrival allowance",
      ],
      keyConditions: [
        "Thai citizen",
        "Minimum 2 years work experience (2,800 hours)",
        "Mandatory 2-year return to Thailand",
      ],
      returnRequirement: true,
      deadlineNote: "Usually early November",
      forFreshGrads: false,
    },
    {
      name: "DAAD Scholarship (EPOS)",
      country: "Germany",
      targetDegree: "Master's or PhD (Development-related)",
      workExpRequired: true,
      coverage: [
        "Monthly stipend (€992 MS, €1,400 PhD)",
        "Health insurance",
        "Travel costs",
        "Study allowance",
      ],
      keyConditions: [
        "Thai citizen",
        "Minimum 2 years professional experience",
        "Development-related field",
      ],
      returnRequirement: true,
      deadlineNote: "Varies by program, typically August-November",
      forFreshGrads: false,
    },
    {
      name: "Australia Awards",
      country: "Australia",
      targetDegree: "Master's (Coursework or Research)",
      workExpRequired: true,
      coverage: [
        "Full tuition",
        "Monthly stipend",
        "Travel costs",
        "Health coverage",
        "Introductory academic program",
      ],
      keyConditions: [
        "Thai citizen",
        "Minimum 24 months work experience",
        "Alignment with priority development fields",
      ],
      returnRequirement: true,
      deadlineNote: "Opens March, closes April (for following year)",
      forFreshGrads: false,
    },
    {
      name: "MEXT Scholarship",
      country: "Japan",
      targetDegree: "Master's or PhD (Research Student)",
      workExpRequired: false,
      coverage: [
        "Full tuition waiver",
        "Monthly stipend",
        "Travel costs",
        "No tuition fees",
      ],
      keyConditions: [
        "Thai citizen",
        "GPA >3.0",
        "English or Japanese proficiency",
        "Must be recommended by Japanese embassy",
      ],
      returnRequirement: false,
      deadlineNote: "Typically April-May for following year",
      forFreshGrads: true,
    },
    {
      name: "Gates Cambridge Scholarship",
      country: "UK (Cambridge)",
      targetDegree: "Master's or PhD at Cambridge",
      workExpRequired: false,
      coverage: [
        "Full tuition",
        "Maintenance allowance",
        "Airfare",
        "Additional discretionary funding",
      ],
      keyConditions: [
        "Must be admitted to Cambridge",
        "Exceptional academic merit",
        "Leadership potential",
        "Commitment to improving others' lives",
      ],
      returnRequirement: false,
      deadlineNote: "December 2 (same as Cambridge funding deadline)",
      forFreshGrads: true,
    },
    {
      name: "ETH Excellence Scholarship (ESOP)",
      country: "Switzerland (ETH Zurich)",
      targetDegree: "Master's at ETH Zurich",
      workExpRequired: false,
      coverage: [
        "Full tuition coverage",
        "CHF 12,000 per semester living stipend",
      ],
      keyConditions: [
        "Must be admitted to ETH MSc program",
        "Top 10% of class",
        "Outstanding academic performance",
      ],
      returnRequirement: false,
      deadlineNote: "November 30 (same as application deadline)",
      forFreshGrads: true,
    },
    {
      name: "Swiss Government Excellence Scholarships",
      country: "Switzerland",
      targetDegree: "PhD or Postdoctoral only",
      workExpRequired: false,
      coverage: [
        "Monthly stipend",
        "Tuition waiver",
        "Health insurance",
        "Housing allowance",
      ],
      keyConditions: [
        "Must be nominated by a Swiss host professor",
        "Not available for Master's students",
      ],
      returnRequirement: false,
      deadlineNote: "Varies, typically September-November",
      forFreshGrads: true,
    },
  ];

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
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
              💰 Scholarship Guide for Thai Students
            </h1>
            <p className="text-blue-100 text-lg">
              Major international scholarships and funding opportunities
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Strategic Note */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <h3 className="text-lg font-bold text-amber-900 mb-2">
              ⚠️ Critical Strategic Note
            </h3>
            <p className="text-amber-800 mb-3">
              Scholarships requiring work experience often include{" "}
              <strong>mandatory return-to-home-country clauses</strong>. This
              conflicts with post-study work visa opportunities.
            </p>
            <div className="space-y-2 text-sm text-amber-900">
              <p>
                <strong>For Long-Term International Career:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Target fully-funded PhD programs (no return requirement)
                </li>
                <li>
                  Or scholarships without return clauses (Fulbright TGS, MEXT,
                  Gates Cambridge, ETH ESOP)
                </li>
              </ul>
            </div>
          </div>

          {/* For Fresh Graduates */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
              <span className="text-4xl">🎓</span>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  For Fresh Graduates
                </h2>
                <p className="text-emerald-700 font-medium">
                  No work experience required
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
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <span className="text-4xl">💼</span>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  For Experienced Professionals
                </h2>
                <p className="text-blue-700 font-medium">
                  Requires 2+ years work experience
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
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">
                        Scholarship
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">
                        Country
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">
                        Work Exp?
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">
                        Return Req?
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">
                        Best For
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {scholarships.map((s, idx) => (
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
                          {s.workExpRequired ? (
                            <span className="text-amber-600">✓ Yes</span>
                          ) : (
                            <span className="text-emerald-600">✗ No</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {s.returnRequirement ? (
                            <span className="text-red-600 font-semibold">
                              ✓ Yes
                            </span>
                          ) : (
                            <span className="text-emerald-600">✗ No</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {s.returnRequirement ? (
                            <span className="text-xs">
                              Career development in Thailand
                            </span>
                          ) : (
                            <span className="text-xs">
                              International career flexibility
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
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
          <span className="text-lg">💰</span> Coverage
        </h4>
        <ul className="space-y-1">
          {scholarship.coverage.map((item, idx) => (
            <li key={idx} className="text-sm text-slate-600 flex items-start">
              <span className="text-emerald-500 mr-2">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Key Conditions */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">
          📋 Key Conditions
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
        <p className="text-xs text-slate-500">
          <strong>Typical Deadline:</strong> {scholarship.deadlineNote}
        </p>
      </div>
    </div>
  );
}
