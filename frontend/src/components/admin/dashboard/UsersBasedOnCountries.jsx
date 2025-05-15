import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const getFlagUrl = (code) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

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

// ? Mock data
const mockGAData = [
  { country: "United States", activeUsers: "120" },
  { country: "India", activeUsers: "95" },
  { country: "Germany", activeUsers: "80" },
  { country: "United Kingdom", activeUsers: "60" },
  { country: "France", activeUsers: "45" },
  { country: "Japan", activeUsers: "35" },
  { country: "Canada", activeUsers: "25" },
];

const UsersBasedOnCountries = ({ gaData = mockGAData }) => {
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
    <div className="min-w-[450px] h-[413px] mr-8">
      <div className="p-6 bg-neutral-50 rounded-lg border border-gray-100 w-full min-h-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-700">Users Based on Countries</h2>
            <p className="text-lg font-bold">{allVisitors.toLocaleString()}</p>
            <p className="text-[11px]">Users added 1823 this month</p>
          </div>
          <div className="flex bg-[#F2FCF4] px-2 py-1 text-[#059669] items-center rounded-sm">
            <p className="text-sm mr-2">4.3%</p>
            <div className="w-4 h-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M10.3117 4.125L15.977 4.12539..." fill="#059669" />
              </svg>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default UsersBasedOnCountries;
