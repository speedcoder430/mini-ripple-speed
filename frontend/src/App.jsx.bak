import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import NotFoundPage from "./pages/NotFound";
import Dashboard from "./pages/User/Dashboard";
import VisitorIPManagement from "./pages/User/VisitorIPManagement";
import TrafficAnalytics from "./pages/User/TrafficAnalytics";
import SecurityThreatDetection from "./pages/User/SecurityThreatDetection";
import DeviceBrowserInsights from "./pages/User/DeviceBrowserInsights";
import BlockedSuspiciousActivityLog from "./pages/User/BlockedSuspiciousActivityLog";
import AccountSubscriptionManagement from "./pages/User/AccountSubscriptionManagement";
import UserProfile from "./pages/User/UserProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import AccessControl from "./pages/Admin/AccessControl";
import Tickets from "./pages/Admin/Tickets";
import SystemLogs from "./pages/Admin/SystemLogs";
import AdminProfile from "./pages/Admin/AdminProfile";


const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/visitor-ip-management" element={<VisitorIPManagement />} />
            <Route path="/traffic-analytics" element={<TrafficAnalytics />} />
            <Route path="/security-threat-detection" element={<SecurityThreatDetection />} />
            <Route path="/device-browser-insights" element={<DeviceBrowserInsights />} />
            <Route path="/blocked-suspicious-activity" element={<BlockedSuspiciousActivityLog />} />
            <Route path="/account-subscription" element={<AccountSubscriptionManagement />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/access-control" element={<AccessControl />} />
            <Route path="/admin/tickets" element={<Tickets />} />
            <Route path="/admin/system-logs" element={<SystemLogs />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
);

export default App;
