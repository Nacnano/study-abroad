'use client';

import { CountryInfo } from '@/types/university';

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
  countryInfo
}: FilterPanelProps) {
  const countries = ['USA', 'Canada', 'UK', 'Switzerland', 'Germany', 'Singapore', 'Australia', 'South Korea'];
  const priorities = ['High', 'Medium', 'Low'];
  const fundingTypes = ['Fully Funded', 'Limited Funding', 'Self-Funded', 'Mixed'];

  const toggleFilter = (value: string, selected: string[], setter: (values: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCountries([]);
    setSelectedPriorities([]);
    setSelectedFundingTypes([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="University, program, research area..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Countries */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Countries ({selectedCountries.length})
        </label>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {countries.map(country => (
            <label key={country} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCountries.includes(country)}
                onChange={() => toggleFilter(country, selectedCountries, setSelectedCountries)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900">
                {country}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Priority ({selectedPriorities.length})
        </label>
        <div className="space-y-2">
          {priorities.map(priority => (
            <label key={priority} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedPriorities.includes(priority)}
                onChange={() => toggleFilter(priority, selectedPriorities, setSelectedPriorities)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900">
                {priority}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Funding Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Funding Type ({selectedFundingTypes.length})
        </label>
        <div className="space-y-2">
          {fundingTypes.map(type => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFundingTypes.includes(type)}
                onChange={() => toggleFilter(type, selectedFundingTypes, setSelectedFundingTypes)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Country Info Panel */}
      {selectedCountries.length === 1 && countryInfo[selectedCountries[0]] && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            {countryInfo[selectedCountries[0]].name} Info
          </h4>
          <div className="space-y-2 text-xs text-blue-800">
            <p><strong>Visa:</strong> {countryInfo[selectedCountries[0]].visaProgram}</p>
            <p><strong>Duration:</strong> {countryInfo[selectedCountries[0]].visaDuration}</p>
            <p className="mt-2 text-xs leading-relaxed">{countryInfo[selectedCountries[0]].strategicVerdict}</p>
          </div>
        </div>
      )}
    </div>
  );
}
