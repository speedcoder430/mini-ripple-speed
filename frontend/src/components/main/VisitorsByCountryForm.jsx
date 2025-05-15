import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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
  romania: "ro"
};

const VisitorsByCountryForm = ({ gaData }) => {
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
    <div className="w-[450px] h-[360px] mr-8">
      <div className="p-6 bg-white rounded-lg border border-gray-100 w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-700">Visitors by Country</h2>
            <p className="text-lg font-bold">{allVisitors.toLocaleString()}</p>
            <p className="text-[11px]">Visual representation of visitor origins</p>
          </div>
          <div className="flex bg-green-50 px-2 py-1 text-green-700 items-center rounded-sm">
            <p className="text-sm mr-2">4.3%</p>
            <Users className="w-4 h-4" />
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

export default VisitorsByCountryForm;
