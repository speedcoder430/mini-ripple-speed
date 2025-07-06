import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useVisitorsByCountry from "./useVisitorsByCountry";

const getFlagUrl = (code) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

const countryCodeMap = {
  "united states": "us",
  india: "in",
  germany: "de",
  "united kingdom": "gb",
  france: "fr",
  japan: "jp",
  canada: "ca",
  china: "cn",
  russia: "ru",
  ethiopia: "et",
  pakistan: "pk",
  romania: "ro",
  unknown: "us", // fallback
};

const VisitorsByCountryForm = () => {
  const { countries: gaData, loading, error } = useVisitorsByCountry();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!Array.isArray(gaData)) return;

    const countryMap = {};

    for (const row of gaData) {
      const rawCountry = row.country || "Unknown";
      const country = rawCountry.toLowerCase();
      const count = parseInt(row.activeUsers) || 0;

      if (!countryMap[country]) countryMap[country] = { name: rawCountry, visitors: 0 };
      countryMap[country].visitors += count;
    }

    const structured = Object.entries(countryMap)
      .map(([key, { name, visitors }]) => ({
        name,
        code: countryCodeMap[key] || "us",
        visitors,
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 6);

    setCountries(structured);
  }, [gaData]);

  const allVisitors = countries.reduce((sum, c) => sum + c.visitors, 0);

  return (
    <div className="w-full xl:w-[450px] h-[413px]">
      <div className="p-6 bg-neutral-50 rounded-lg border border-gray-100 w-full min-h-full space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-700">Visitors by Country</h2>
            <p className="text-lg font-bold">{allVisitors.toLocaleString()}</p>
            <p className="text-[11px]">Visual representation of visitor origins</p>
          </div>
          {/* You can update growth % or remove if not required */}
          <div className="flex bg-[#F2FCF4] px-2 py-1 text-[#059669] items-center rounded-sm">
            <p className="text-sm mr-2">+0%</p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading visitor data...</p>
        ) : error ? (
          <p className="text-sm text-red-500">Failed to load visitor data.</p>
        ) : (
          <div className="space-y-4">
            {countries.map((country, i) => (
              <motion.div
                key={`${country.code}-${i}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <img
                  src={getFlagUrl(country.code)}
                  alt={`Flag of ${country.name}`}
                  className="w-8 h-6 rounded-sm border-2 border-blue-200"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-bold">{country.name}</span>
                    <span className="text-xs font-bold text-gray-800">
                      {((country.visitors / allVisitors) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-[86%] bg-blue-200 h-1">
                    <div
                      className="bg-blue-800 h-1"
                      style={{ width: `${(country.visitors / allVisitors) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorsByCountryForm;
