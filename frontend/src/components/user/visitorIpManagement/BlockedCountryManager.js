import React, { useEffect, useState } from "react";
import Dropdown from "@/components/public/Dropdown";
import axios from "axios";
import Button from "@/components/public/Button"; // If you're using it
import { getAuth } from "firebase/auth";

// Static country list (you may replace with API-based or i18n-friendly list)
const countryOptions = [
  "US", "GB", "PK", "IN", "CA", "DE", "DK", "FR", "CN", "RU", "SK", "AU", "IT"
];

const BlockedCountryManager = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [blockedCountries, setBlockedCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlockedCountries = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/blocked-country/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlockedCountries(res.data.data.map(c => c.countryCode));
    } catch (error) {
      console.error("❌ Failed to fetch blocked countries", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedCountries();
  }, []);

  const handleSelect = async (countryCode) => {
    if (selectedCountries.includes(countryCode)) return;

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/blocked-country/block`,
        {
          countryCode,
          reason: "High spam activity from this region",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedCountries(prev => [...prev, countryCode]);
      fetchBlockedCountries(); // Refresh from backend
    } catch (error) {
      console.error("Failed to block country:", error);
    }
  };

  const handleUnblock = async (countryCode) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/blocked-country/unblock`,
        { countryCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedCountries(prev => prev.filter(code => code !== countryCode));
      fetchBlockedCountries();
    } catch (error) {
      console.error("Failed to unblock country:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Blocked Country Manager</h2>

      <Dropdown
        label="Select Country to Block"
        options={countryOptions}
        onSelect={handleSelect}
      />

      {/* Render selected country tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {blockedCountries.map((code) => (
          <div
            key={code}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
          >
            {code}
            <button
              onClick={() => handleUnblock(code)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Table of blocked countries */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Blocked Countries Table</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Country Code</th>
                <th className="p-2">Reason</th>
                <th className="p-2">Blocked At</th>
              </tr>
            </thead>
            <tbody>
              {blockedCountries.length === 0 ? (
                <tr><td colSpan="3" className="p-2 text-center">No blocked countries.</td></tr>
              ) : (
                blockedCountries.map(code => (
                  <tr key={code} className="border-t">
                    <td className="p-2">{code}</td>
                    <td className="p-2">High spam activity from this region</td>
                    <td className="p-2">—</td> {/* Add `blockedAt` if needed */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BlockedCountryManager;
