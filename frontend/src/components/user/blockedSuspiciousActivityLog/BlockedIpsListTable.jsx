import React, { useEffect, useState } from 'react';

const mockGaData = [
    {
        pagePath: '/home',
        bounceRate: '0.92',
        averageSessionDuration: '45',
        browser: 'Chrome',
        date: '2025-05-01',
    },
    {
        pagePath: '/api/data',
        bounceRate: '0.30',
        averageSessionDuration: '60',
        browser: 'Safari',
        date: '2025-05-02',
    },
    {
        pagePath: '/admin/settings',
        bounceRate: '0.40',
        averageSessionDuration: '400',
        browser: 'Edge',
        date: '2025-05-03',
    },
    {
        pagePath: '/services',
        bounceRate: '0.85',
        averageSessionDuration: '2',
        browser: 'Firefox',
        date: '2025-05-04',
    },
    {
        pagePath: '/dashboard',
        bounceRate: '0.20',
        averageSessionDuration: '2000',
        browser: 'HeadlessChrome',
        date: '2025-05-05',
    },
];

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB').replace(/\//g, '-');
};

const BlockedIpsListTable = ({ gaData = mockGaData }) => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const suspicious = gaData
            .filter((row) => {
                const bounce = parseFloat(row.bounceRate);
                const duration = parseFloat(row.averageSessionDuration);
                const browser = row.browser?.toLowerCase() || '';
                const path = row.pagePath?.toLowerCase() || '';

                return (
                    bounce >= 0.9 ||
                    duration <= 3 ||
                    duration >= 1800 ||
                    browser.includes('headless') ||
                    path.includes('/api') ||
                    path.includes('/admin')
                );
            })
            .map((row, index) => {
                let reason = 'Unusual Behavior';
                if ((row.browser || '').toLowerCase().includes('headless')) {
                    reason = 'Bot Access';
                } else if (parseFloat(row.bounceRate) >= 0.9) {
                    reason = 'High Bounce Rate';
                } else if (parseFloat(row.averageSessionDuration) <= 3) {
                    reason = 'Very Short Visit';
                } else if (parseFloat(row.averageSessionDuration) >= 1800) {
                    reason = 'Suspicious Long Visit';
                } else if ((row.pagePath || '').toLowerCase().includes('/api')) {
                    reason = 'API Endpoint Visit';
                } else if ((row.pagePath || '').toLowerCase().includes('/admin')) {
                    reason = 'Admin Page Visit';
                }

                return {
                    ip: `192.168.1.${index + 10}`,
                    type: 'Auto-Blocked',
                    reason,
                    date: formatDate(row.date || new Date().toISOString()),
                    status: 'Blocked',
                };
            });

        setAlerts(suspicious);
    }, [gaData]);

    const handleUnblock = (ip) => {
        setAlerts((prev) => prev.filter((item) => item.ip !== ip));
    };

    return (
        <div className="w-full relative">
            <div className="h-[360px] overflow-auto relative">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-blue-200 text-sm text-gray-700">
                        <tr>
                            <th className="p-3 px-6">Blocked IP</th>
                            <th className="p-3">Block Type</th>
                            <th className="p-3">Reason</th>
                            <th className="p-3">Date Blocked</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length > 0 ? (
                            alerts.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50 text-sm">
                                    <td className="p-3 px-6">{item.ip}</td>
                                    <td className="p-3">{item.type}</td>
                                    <td className="p-3">{item.reason}</td>
                                    <td className="p-3">{item.date}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleUnblock(item.ip)}
                                            className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                        >
                                            Unblock
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center p-6 text-gray-500">
                                    No suspicious activity detected.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlockedIpsListTable;
