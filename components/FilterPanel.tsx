"use client";

import { CountryInfo, University } from "@/types/university";
import { PRIORITY_CONFIG } from "@/constants/priorities";
import { PRIORITIES } from "@/constants/ui";
import { Filter, Search, X, Calendar, Info } from "lucide-react";
import { CountryFlag } from "./CountryFlag";

interface FilterPanelProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  selectedPriorities: string[];
  setSelectedPriorities: (priorities: string[]) => void;
  selectedFundingTypes: string[];
  setSelectedFundingTypes: (types: string[]) => void;
  countryInfo: Record<string, CountryInfo>;
  universities: University[];
}

export default function FilterPanel({
  searchQuery,
  setSearchQuery,
  selectedCountries,
  setSelectedCountries,
  selectedPriorities,
  setSelectedPriorities,
  selectedFundingTypes,
  setSelectedFundingTypes,
  countryInfo,
  universities,
}: FilterPanelProps) {
  // Extract unique countries from universities data
  const availableCountries = Array.from(
    new Set(universities.map((uni) => uni.country))
  ).sort();

  // Extract unique funding types from universities data
  const availableFundingTypes = Array.from(
    new Set(
      universities
        .map((uni) => uni.fundingType)
        .filter((type) => type !== undefined) as string[]
    )
  ).sort();

  const toggleFilter = (
    value: string,
    selected: string[],
    setter: (values: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter((v) => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCountries([]);
    setSelectedPriorities([]);
    setSelectedFundingTypes([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 sticky top-6 backdrop-blur-sm max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-200 shrink-0">
        <h3 className="text-xl font-bold bg-linear-to-rrom-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" /> Filters
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-1"
        >
          <X className="w-4 h-4" /> Clear
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto px-6 py-4 flex-1">
        {/* Search */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
            <Search className="w-4 h-4" /> Search
          </label>
          <input
            type="text"
            placeholder="University, program, research area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
          />
        </div>

        {/* Countries */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Countries ({selectedCountries.length})
          </label>
          <div className="space-y-2">
            {availableCountries.map((country) => (
              <label
                key={country}
                className="flex items-center cursor-pointer group p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country)}
                  onChange={() =>
                    toggleFilter(
                      country,
                      selectedCountries,
                      setSelectedCountries
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 shrink-0"
                />
                <div className="ml-3 flex items-center gap-2 flex-1">
                  <CountryFlag country={country} width={20} />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    {country}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Priority ({selectedPriorities.length})
          </label>
          <div className="space-y-2">
            {PRIORITIES.map((priority) => {
              const config = PRIORITY_CONFIG[priority];

              return (
                <label
                  key={priority}
                  className={`flex items-center justify-between cursor-pointer group p-2 rounded-lg transition-colors ${config.bgColor} ${config.hoverBgColor} border ${config.borderColor}`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPriorities.includes(priority)}
                      onChange={() =>
                        toggleFilter(
                          priority,
                          selectedPriorities,
                          setSelectedPriorities
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-slate-700 group-hover:text-slate-900 flex items-center gap-1">
                      {config.icon} {priority}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {config.timeRange}
                  </span>
                </label>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-2 italic flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Based on current date:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Funding Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Funding Type ({selectedFundingTypes.length})
          </label>
          <div className="space-y-2">
            {availableFundingTypes.map((type) => (
              <label
                key={type}
                className="flex items-center cursor-pointer group p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedFundingTypes.includes(type)}
                  onChange={() =>
                    toggleFilter(
                      type,
                      selectedFundingTypes,
                      setSelectedFundingTypes
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 shrink-0"
                />
                <span className="ml-3 text-sm text-slate-700 group-hover:text-slate-900 wrap-break-word">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Country Info Panel */}
        {selectedCountries.length === 1 &&
          countryInfo[selectedCountries[0]] && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                {countryInfo[selectedCountries[0]].name} Info
              </h4>
              <div className="space-y-2 text-xs text-blue-800">
                <p>
                  <strong>Visa:</strong>{" "}
                  {countryInfo[selectedCountries[0]].visaProgram}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {countryInfo[selectedCountries[0]].visaDuration}
                </p>
                <p className="mt-2 text-xs leading-relaxed">
                  {countryInfo[selectedCountries[0]].strategicVerdict}
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
