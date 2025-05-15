import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";

import MetricCard from "./MetricCard";
import IPTable from "./IPTable";
import Pagination from "./Pagination";

const countries = [
    "No Country",
    "Algeria",
    "USA",
    "Brazil",
    "Iran",
    "Serbia",
    "Bahrain",
    "Haiti",
    "South Africa",
    "Aland Islands",
    "Iceland",
];

const filterOptions = ["All", "IP Address", "Added On", "Last Activity", "Location"];

const mockData = [
    { id: "8829", ipAddress: "192.168.1.10", addedOn: "10-03-2025", lastActivity: "19-03-2025", location: "New York, USA", status: "Active", statusColor: "text-blue-700" },
    { id: "3536", ipAddress: "185.22.44.12", addedOn: "12-03-2025", lastActivity: "15-03-2025", location: "London, UK", status: "Blocked", statusColor: "text-red-500" },
    { id: "4349", ipAddress: "62.26.134.247", addedOn: "14-03-2025", lastActivity: "19-03-2025", location: "Berlin, Germany", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "5560", ipAddress: "37.26.77.113", addedOn: "17-03-2025", lastActivity: "19-03-2025", location: "Sydney, Australia", status: "Active", statusColor: "text-blue-700" },
    { id: "4600", ipAddress: "123.152.99.118", addedOn: "09-03-2025", lastActivity: "18-03-2025", location: "Toronto, Canada", status: "Suspicious", statusColor: "text-amber-500" },
    { id: "7791", ipAddress: "69.247.238.50", addedOn: "11-03-2025", lastActivity: "13-03-2025", location: "Moscow, Russia", status: "Blocked", statusColor: "text-red-500" },
    { id: "8861", ipAddress: "113.2.183.254", addedOn: "15-03-2025", lastActivity: "19-03-2025", location: "Mumbai, India", status: "Active", statusColor: "text-blue-700" },
    { id: "1148", ipAddress: "61.139.82.146", addedOn: "16-03-2025", lastActivity: "16-03-2025", location: "Tokyo, Japan", status: "Suspicious", statusColor: "text-amber-500" }
];

const MainForm = () => {
    const [ipData, setIpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedCountry, setSelectedCountry] = useState("No Country");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [vpnEnabled, setVpnEnabled] = useState(false);

    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState("15/03/2025");
    const [calendarDate, setCalendarDate] = useState(parse("15/03/2025", "dd/MM/yyyy", new Date()));

    useEffect(() => {
        setIpData(mockData);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedFilter]);

    const handleCalendarChange = (date) => {
        setCalendarDate(date);
        setSelectedDate(format(date, "dd/MM/yyyy"));
        setShowCalendar(false);
    };

    const handleToggleVpn = () => setVpnEnabled(prev => !prev);
    const handleDropdownToggle = () => setIsDropdownOpen(prev => !prev);
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
    };

    const toggleFilterDropdown = () => setShowFilterDropdown(prev => !prev);
    const handleFilterSelect = (option) => {
        setSelectedFilter(option);
        setShowFilterDropdown(false);
    };

    const toggleCalendar = () => setShowCalendar(prev => !prev);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = ipData.filter((item) => {
        const query = searchQuery.toLowerCase();
        if (selectedFilter === "All") {
            return Object.values(item).some(val =>
                typeof val === "string" && val.toLowerCase().includes(query)
            );
        } else if (selectedFilter === "IP Address") {
            return item.ipAddress.toLowerCase().includes(query);
        } else if (selectedFilter === "Added On") {
            return item.addedOn.includes(query);
        } else if (selectedFilter === "Last Activity") {
            return item.lastActivity.includes(query);
        } else if (selectedFilter === "Location") {
            return item.location.toLowerCase().includes(query);
        }
        return true;
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {/* Header */}
            <div className="flex flex-wrap gap-5 justify-between pr-6 mt-6 w-full max-md:mr-2.5 max-md:max-w-full">
                <div className="flex flex-wrap gap-3 px-6 max-md:max-w-full bg-gradient-to-r from-blue-start to-blue-end py-0 font-['Jost']">
                    <div className="relative flex gap-1.5 items-center">
                        <p className="grow text-base text-slate-900">Blocked</p>

                        {/* Country Dropdown */}
                        <div className="relative">
                            <div
                                className="flex gap-2 items-center px-5 rounded cursor-pointer min-h-[46px] max-w-[100%]"
                                onClick={handleDropdownToggle}
                            >
                                <p className="text-base font-semibold leading-none text-slate-900 w-[100px]">
                                    {selectedCountry}
                                </p>
                                <img
                                    src="/page/visitorIpManagement/main-form-12.svg"
                                    className={`w-2.5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                    alt="Dropdown arrow"
                                />
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-3 ml-3 bg-white shadow-md rounded w-full max-h-60 overflow-y-auto">
                                    {countries.map((country) => (
                                        <div
                                            key={country}
                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                                            onClick={() => handleCountrySelect(country)}
                                        >
                                            {country}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Enable VPN Toggle (static for now) */}
                    <div className="flex gap-3 items-center">
                        <div className="w-px h-10 bg-blue-700 opacity-20" />
                        <div className="flex gap-3 items-center px-3 py-0">
                            <p className="text-base font-semibold text-black">Enable VPN</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={vpnEnabled} onChange={handleToggleVpn} />
                                <div className="w-8 h-3 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[-2px] after:left-[0px] after:bg-blue-600 after:border-blue-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-200"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <button className="px-6 py-3.5 text-base font-semibold rounded-md bg-slate-900 text-neutral-50 max-md:px-5 font-['Jost']">
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

            {/* Search & Filter */}
            <div className="flex flex-wrap gap-5 justify-between mt-5 px-6 w-full max-md:mr-2.5 max-md:max-w-full">
                <div className="flex flex-wrap gap-6 items-start self-start max-md:max-w-full">
                    <div className="flex rounded-[6px] overflow-hidden border-2 border-blue-800">
                        <div className="flex items-center justify-center rounded-br-[4px] rounded-tr-[4px] px-4 bg-blue-800">
                            <img
                                src="/page/visitorIpManagement/main-form-9.svg"
                                className="w-[15px]"
                                alt="Search"
                            />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="flex-1 p-2.5 text-sm text-[#4D5158]"
                        />
                    </div>

                    <div className="relative">
                        <button
                            onClick={toggleFilterDropdown}
                            className="flex items-center gap-2 text-sm text-blue-800 border-2 border-blue-800 px-3 py-2.5 rounded-[6px] hover:bg-blue-100"
                        >
                            <img
                                src="/page/visitorIpManagement/main-form-10.svg"
                                className="w-5"
                                alt="Filter"
                            />
                            {selectedFilter}
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute z-10 mt-2 bg-white shadow-md rounded w-40">
                                {filterOptions.map((option) => (
                                    <div
                                        key={option}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                                        onClick={() => handleFilterSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Calendar Button with Date Selector */}
                    <div className="relative">
                        <button
                            onClick={toggleCalendar}
                            className="flex items-center gap-2 text-sm text-blue-800 px-3.5 py-2.5 border-2 border-blue-800 rounded-md hover:bg-blue-100"
                        >
                            {selectedDate}
                            <img
                                src="/page/visitorIpManagement/main-form-11.svg"
                                className="w-5"
                                alt="Calendar"
                            />
                        </button>
                        {showCalendar && (
                            <div className="absolute z-10 mt-2">
                                <DatePicker
                                    selected={calendarDate}
                                    onChange={handleCalendarChange}
                                    inline
                                />
                            </div>
                        )}
                    </div>
                </div>

                <button className="px-6 py-2.5 text-base font-semibold rounded-md bg-slate-900 text-neutral-50 max-md:px-5">
                    Export
                </button>
            </div>

            {/* Table */}
            <IPTable data={paginatedData} />

            {/* Pagination */}
            <div className="w-full flex justify-end">
                <Pagination
                    totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default MainForm;
