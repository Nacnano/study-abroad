"use client";

import { useState, useMemo } from "react";
import { universities, countryInfo } from "@/data/universities";
import UniversityCard from "@/components/UniversityCard";
import FilterPanel from "@/components/FilterPanel";
import StatsOverview from "@/components/StatsOverview";
import DeadlineTimeline from "@/components/DeadlineTimeline";
import Navigation from "@/components/Navigation";

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
      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(uni.priority);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  AI/ML Graduate Programs
                </h1>
                <p className="text-slate-600 mt-1">
                  Fall 2026-2027 Admission Cycle • Strategic Guide for Thai
                  Students
                </p>
              </div>
              <button
                onClick={() => setShowDeadlineTimeline(!showDeadlineTimeline)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showDeadlineTimeline ? "Show List View" : "Show Timeline"}
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
              />
            </div>

            {/* University List or Timeline */}
            <div className="lg:col-span-3">
              {showDeadlineTimeline ? (
                <DeadlineTimeline universities={filteredUniversities} />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {filteredUniversities.length}{" "}
                      {filteredUniversities.length === 1
                        ? "University"
                        : "Universities"}
                    </h2>
                  </div>

                  {filteredUniversities.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                      <p className="text-slate-500 text-lg">
                        No universities match your criteria
                      </p>
                      <p className="text-slate-400 mt-2">
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
