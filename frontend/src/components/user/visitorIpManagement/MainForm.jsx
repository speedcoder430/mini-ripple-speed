import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";
import MetricCard from "./MetricCard";
import IPTable from "./IPTable";
import Pagination from "./Pagination";
import ManualIPBlockModal from "./ManualIPBlockModal";

const countries = [
    { name: "No Country", code: "XX" },
    { name: "Algeria", code: "DZ" },
    { name: "USA", code: "US" },
    { name: "UK", code: "GB" },
    { name: "Iran", code: "IR" },
    { name: "Serbia", code: "RS" },
    { name: "Bahrain", code: "BH" },
    { name: "Haiti", code: "HT" },
    { name: "South Africa", code: "ZA" },
    { name: "Aland Islands", code: "AX" },
    { name: "Iceland", code: "IS" },
];

const MainForm = () => {
    const [ipData, setIpData] = useState([]);
    const [blockedCountries, setBlockedCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarDate, setCalendarDate] = useState(parse("15/03/2025", "dd/MM/yyyy", new Date()));
    const [showIPModal, setShowIPModal] = useState(false);
    const [countrySearch, setCountrySearch] = useState("");
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

    const itemsPerPage = 8;

    useEffect(() => {
        const stored = localStorage.getItem("blockedCountries");
        if (stored) {
            setBlockedCountries(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        const fetchAllBlocked = async () => {
            try {
                const [ipRes, countryRes] = await Promise.all([
                    fetch("http://localhost:3000/api/v2/blocked-ip/all"),
                    fetch("http://localhost:3000/api/v2/blocked-country/all"),
                ]);

                const ipJson = await ipRes.json();
                const countryJson = await countryRes.json();

                const ips = (ipJson?.data || []).map((item) => ({
                    id: `ip-${item.ip}`,
                    ipAddress: item.ip,
                    addedOn: item.blockedAt?.split("T")[0] || "—",
                    lastActivity: "—",
                    location: "Manual Block",
                    status: "Blocked",
                    statusColor: "text-red-500",
                }));

                const countries = (countryJson?.data || []).map((item) => ({
                    id: `country-${item.countryCode}`,
                    countryCode: item.countryCode,
                    countryName: item.countryName || item.countryCode,
                    addedOn: item.blockedAt?.split("T")[0] || "—",
                    lastActivity: "—",
                    location: item.countryName || item.countryCode,
                    status: "Blocked",
                    statusColor: "text-red-500",
                }));

                const countryCodes = countries.map((c) => c.countryCode);

                setIpData([...ips, ...countries]);
                setBlockedCountries(countryCodes);
                localStorage.setItem("blockedCountries", JSON.stringify(countryCodes));
            } catch (err) {
                console.error("Failed to fetch initial blocked data", err);
            }
        };

        fetchAllBlocked();
    }, []);

    const handleBlockIP = async (ip, reasonText, expiryDate) => {
        try {
            const payload = {
                ip,
                reason: reasonText || "Manually blocked",
                expiresAt: new Date(expiryDate).toISOString(),
            };

            const res = await fetch("http://localhost:3000/api/v2/blocked-ip/block", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = await res.json();
            if (!json.success) throw new Error(json.message || "Failed");

            const item = json.data;

            const newEntry = {
                id: `ip-${item.ip}`,
                ipAddress: item.ip,
                addedOn: item.blockedAt?.split("T")[0] || "—",
                lastActivity: "—",
                location: "Manual Block",
                status: "Blocked",
                statusColor: "text-red-500",
            };

            setIpData((prev) => [...prev, newEntry]);
        } catch (err) {
            console.error("Block IP failed", err);
        }
    };

    const handleBlockCountry = async (country) => {
        if (!country || !country.code || country.code === "XX" || blockedCountries.includes(country.code)) return;

        try {
            const res = await fetch("http://localhost:3000/api/v2/blocked-country/block", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    countryCode: country.code,
                    reason: "High spam activity from this region",
                }),
            });

            const json = await res.json();
            if (json.success) {
                const updatedCountries = [...blockedCountries, country.code];
                setBlockedCountries(updatedCountries);
                localStorage.setItem("blockedCountries", JSON.stringify(updatedCountries));

                const newEntry = {
                    id: `country-${country.code}`,
                    countryCode: country.code,
                    countryName: country.name,
                    addedOn: new Date().toISOString().split("T")[0],
                    lastActivity: "—",
                    location: country.name,
                    status: "Blocked",
                    statusColor: "text-red-500",
                };

                setIpData((prev) => [...prev, newEntry]);
            }
        } catch (err) {
            console.error("Block Country failed", err);
        }
    };

    const handleUnblockIP = async (ip) => {
        try {
            await fetch("http://localhost:3000/api/v2/blocked-ip/unblock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ip }),
            });

            setIpData((prev) => prev.filter((item) => item.ipAddress !== ip));
        } catch (err) {
            console.error("Unblock IP failed", err);
        }
    };

    const handleUnblockCountry = async (code) => {
        try {
            await fetch("http://localhost:3000/api/v2/blocked-country/unblock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ countryCode: code }),
            });

            setIpData((prev) => prev.filter((item) => item.countryCode !== code));
            const updated = blockedCountries.filter((c) => c !== code);
            setBlockedCountries(updated);
            localStorage.setItem("blockedCountries", JSON.stringify(updated));
        } catch (err) {
            console.error("Unblock Country failed", err);
        }
    };

    const filteredData = ipData.filter((item) => {
        const query = searchQuery.toLowerCase();
        const locationLower = item.location?.toLowerCase() || "";
        const ipLower = item.ipAddress?.toLowerCase() || "";

        const matchesQuery = (val) => typeof val === "string" && val.toLowerCase().includes(query);

        if (selectedFilter === "All") return Object.values(item).some(matchesQuery);
        if (selectedFilter === "IP Address") return ipLower.includes(query);
        if (selectedFilter === "Added On") return item.addedOn?.toLowerCase().includes(query);
        if (selectedFilter === "Last Activity") return item.lastActivity?.toLowerCase().includes(query);
        if (selectedFilter === "Location") return locationLower.includes(query);

        return true;
    });

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleCountrySearchSelect = (label) => {
        const selected = countries.find((c) => `${c.name} (${c.code})` === label);
        if (!selected || selected.code === "XX") return;
        handleBlockCountry(selected);
        setCountrySearch("");
        setCountryDropdownOpen(false);
    };

    return (
        <>

            <div className="flex flex-wrap justify-between gap-4 mt-6 px-6">
                <div className="relative w-full max-w-xs">
                    <input
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Search country to block"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        onFocus={() => setCountryDropdownOpen(true)}
                    />
                    {countryDropdownOpen && (
                        <div className="absolute z-50 bg-white border mt-1 rounded w-full shadow max-h-60 overflow-y-auto">
                            {countries
                                .filter((c) =>
                                    c.code !== "XX" &&
                                    c.name.toLowerCase().includes(countrySearch.toLowerCase()))
                                .map((c) => (
                                    <div
                                        key={c.code}
                                        onClick={() => handleCountrySearchSelect(`${c.name} (${c.code})`)}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                    >
                                        {c.name} ({c.code})
                                    </div>
                                ))}
                        </div>
                    )}
                </div>


                <div className="flex flex-wrap gap-2">
                    {blockedCountries.map((code) => {
                        const countryName = countries.find((c) => c.code === code)?.name || code;
                        return (
                            <div
                                key={code}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full text-sm text-blue-800"
                            >
                                {countryName}
                                <button onClick={() => handleUnblockCountry(code)} className="hover:text-red-500">×</button>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={() => setShowIPModal(true)}
                    className="px-6 py-2 text-white bg-slate-900 rounded-md"
                >
                    Block IP Manually
                </button>
            </div>


            {/* Metrics */}
            <div className="flex flex-wrap gap-6 mt-6 mx-6 max-md:mx-2.5">
                <MetricCard
                    icon="/page/visitorIpManagement/main-form-1.svg"
                    title="Blocked Countries"
                    value="8"
                    percentage="4.3%"
                    trend="up"
                    trendIcon="/page/visitorIpManagement/main-form-2.svg"
                    trendColor="text-blue-500 bg-blue-200"
                    bgColor="bg-blue-100 border-blue-200 border-2"
                />
                <MetricCard
                    icon="/page/visitorIpManagement/main-form-3.svg"
                    title="VPN Traffic"
                    value="736"
                    percentage="5.2%"
                    trend="up"
                    trendIcon="/page/visitorIpManagement/main-form-4.svg"
                    trendColor="text-emerald-600 bg-emerald-200"
                    bgColor="bg-teal-100 border-teal-200 border-2"
                />
                <MetricCard
                    icon="/page/visitorIpManagement/main-form-5.svg"
                    title="Blocked IP"
                    value="130"
                    percentage="0.5%"
                    trend="down"
                    trendIcon="/page/visitorIpManagement/main-form-6.svg"
                    trendColor="text-red-500 bg-rose-200"
                    bgColor="bg-rose-100 border-rose-200 border-2"
                />
                <MetricCard
                    icon="/page/visitorIpManagement/main-form-7.svg"
                    title="Suspicious IP"
                    value="1000"
                    percentage="4.3%"
                    trend="up"
                    trendIcon="/page/visitorIpManagement/main-form-8.svg"
                    trendColor="text-amber-500 bg-yellow-200"
                    bgColor="bg-yellow-100 border-yellow-200 border-2"
                />
            </div>
            <ManualIPBlockModal
                open={showIPModal}
                onClose={() => setShowIPModal(false)}
                onBlock={handleBlockIP}
                onDelete={handleUnblockIP}
            />

            <IPTable
                data={paginatedData}
                onRemoveBlockedCountry={handleUnblockCountry}
                onRemoveBlockedIP={handleUnblockIP}
            />

            <Pagination
                totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
};

export default MainForm;


