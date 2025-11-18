"use client";

import { useState, useMemo } from "react";
import { universities } from "@/data/universities";
import { countryInfo } from "@/data/countries";
import UniversityCard from "@/components/UniversityCard";
import FilterPanel from "@/components/FilterPanel";
import StatsOverview from "@/components/StatsOverview";
import DeadlineTimeline from "@/components/DeadlineTimeline";
import Navigation from "@/components/Navigation";
import { calculatePriority } from "@/utils/calculatePriority";
import { GraduationCap, Calendar, List } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedFundingTypes, setSelectedFundingTypes] = useState<string[]>(
    []
  );
  const [showDeadlineTimeline, setShowDeadlineTimeline] = useState(false);

  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.programs.some((p) =>
          p.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        uni.researchAreas.some((r) =>
          r.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCountry =
        selectedCountries.length === 0 ||
        selectedCountries.includes(uni.country);

      const priority = calculatePriority(uni.applicationDeadline);
      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(priority);

      const matchesFunding =
        selectedFundingTypes.length === 0 ||
        (uni.fundingType && selectedFundingTypes.includes(uni.fundingType));

      return (
        matchesSearch && matchesCountry && matchesPriority && matchesFunding
      );
    });
  }, [
    searchQuery,
    selectedCountries,
    selectedPriorities,
    selectedFundingTypes,
  ]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
        {/* Header */}
        <header className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-10 h-10" />
                <div>
                  <h1 className="text-4xl font-bold mb-1 drop-shadow-lg">
                    AI/ML Graduate Programs
                  </h1>
                  <p className="text-blue-100 dark:text-blue-200 text-lg">
                    Fall 2026-2027 • Strategic Guide for Thai Students
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeadlineTimeline(!showDeadlineTimeline)}
                className="px-6 py-3 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                {showDeadlineTimeline ? (
                  <>
                    <List className="w-5 h-5" />
                    <span>List View</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>Timeline</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <StatsOverview universities={filteredUniversities} />

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
                selectedPriorities={selectedPriorities}
                setSelectedPriorities={setSelectedPriorities}
                selectedFundingTypes={selectedFundingTypes}
                setSelectedFundingTypes={setSelectedFundingTypes}
                countryInfo={countryInfo}
                universities={universities}
              />
            </div>

            {/* University List or Timeline */}
            <div className="lg:col-span-3">
              {showDeadlineTimeline ? (
                <DeadlineTimeline universities={filteredUniversities} />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {filteredUniversities.length}{" "}
                      {filteredUniversities.length === 1
                        ? "University"
                        : "Universities"}
                    </h2>
                  </div>

                  {filteredUniversities.length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-12 text-center border dark:border-slate-700">
                      <p className="text-slate-500 dark:text-slate-400 text-lg">
                        No universities match your criteria
                      </p>
                      <p className="text-slate-400 dark:text-slate-500 mt-2">
                        Try adjusting your filters
                      </p>
                    </div>
                  ) : (
                    filteredUniversities.map((uni) => (
                      <UniversityCard key={uni.id} university={uni} />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
