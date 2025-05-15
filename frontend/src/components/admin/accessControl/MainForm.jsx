import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";
import UserListTable from "./UserListTable";
import Pagination from "./Pagination";
import RoleCard from "./RoleCard";

const mockData = [
    {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "role": "",
        "phoneNumber": "+1-202-555-0147",
        "addedDate": "17-02-2025",
        "status": "Active"
    },
    {
        "name": "Bob Smith",
        "email": "bobsmith99@gmail.com",
        "role": "",
        "phoneNumber": "+1-303-555-0192",
        "addedDate": "17-02-2025",
        "status": "Inactive"
    },
    {
        "name": "Carla Mendes",
        "email": "carla.mendes@outlook.com",
        "role": "Power User",
        "phoneNumber": "+1-415-555-0178",
        "addedDate": "17-02-2025",
        "status": "Active"
    },
    {
        "name": "David Kim",
        "email": "david.kim@company.com",
        "role": "User Admin",
        "phoneNumber": "+1-646-555-0123",
        "addedDate": "17-02-2025",
        "status": "Inactive"
    },
    {
        "name": "Ella Tran",
        "email": "ella.tran@protonmail.com",
        "role": "Guest User",
        "phoneNumber": "+1-510-555-0145",
        "addedDate": "17-02-2025",
        "status": "Active"
    },
    {
        "name": "Franklin Lee",
        "email": "franklee22@yahoo.com",
        "role": "System Auditor",
        "phoneNumber": "+1-312-555-0102",
        "addedDate": "17-02-2025",
        "status": "Inactive"
    },
    {
        "name": "Grace Patel",
        "email": "grace.patel@domain.org",
        "role": "Super Admin",
        "phoneNumber": "+1-718-555-0163",
        "addedDate": "17-02-2025",
        "status": "Active"
    },
    {
        "name": "Henry Zhao",
        "email": "henryzhao@example.org",
        "role": "Support Auditor",
        "phoneNumber": "+1-408-555-0117",
        "addedDate": "17-02-2025",
        "status": "Inactive"
    },
    {
        "name": "Isabel Garcia",
        "email": "isabel.garcia@mail.com",
        "role": "Support Agent",
        "phoneNumber": "+1-602-555-0180",
        "addedDate": "17-02-2025",
        "status": "Active"
    },
    {
        "name": "James Nguyen",
        "email": "james.nguyen@demo.com",
        "role": "Power User",
        "phoneNumber": "+1-213-555-0154",
        "addedDate": "17-02-2025",
        "status": "Inactive"
    }
];

const roleMockData = [
    {
        roleName: "Standard User",
        roleDescription: "Can access their own profile and basic dashboard features"
    },
    {
        roleName: "Power User",
        roleDescription: "Has access to additional tools, reports, and analytics"
    },
    {
        roleName: "Support Agent",
        roleDescription: "Can view user issues and respond to support tickets"
    },
    {
        roleName: "Compliance Officer",
        roleDescription: "Can access audit logs, user reports, and sucurity incidents"
    },
    {
        roleName: "Guest User",
        roleDescription: "Read-only access to public reports or dashboards"
    },
    {
        roleName: "Super Admin",
        roleDescription: "Full access to all system settuings, users, roles, and logs"
    },
    {
        roleName: "User Admin",
        roleDescription: "Can add, edit, disable, or delete users"
    },
    {
        roleName: "System Auditor",
        roleDescription: "Can view logs, activity history, and security alerts"
    }
];

const MainForm = () => {
    const [ipData, setIpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [searchQuery, setSearchQuery] = useState("");

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
            <div className="flex items-center px-6 pt-6 font-semibold text-[14px]">
                <div className="flex-1 font-['Amble']">
                    Roles & Permissions Added (8)
                </div>
                <button className="px-6 py-2.5 text-base font-semibold rounded-md bg-slate-900 text-neutral-50 max-md:px-5">
                    Add New Role
                </button>
            </div>

            <div className="w-full flex flex-wrap p-3 mt-6 justify-between font-['Amble'] bg-gradient-to-r from-[#3978D7] to-[#011732]">
                {roleMockData.map((item, index) => (
                    <RoleCard
                        key={index}
                        roleName={item?.roleName}
                        roleDescription={item?.roleDescription}
                    />
                ))}
            </div>

            <div className="flex items-center px-6 pt-6 font-semibold text-[14px]">
                Users
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
            </div>

            {/* Table */}
            <UserListTable data={paginatedData} />

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
