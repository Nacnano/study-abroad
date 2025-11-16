"use client";

import { useState, useMemo } from "react";
import { universities, countryInfo } from "@/data/universities";
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
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="relative bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-10 h-10" />
                <div>
                  <h1 className="text-4xl font-bold mb-1 drop-shadow-lg">
                    AI/ML Graduate Programs
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Fall 2026-2027 • Strategic Guide for Thai Students
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeadlineTimeline(!showDeadlineTimeline)}
                className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
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
