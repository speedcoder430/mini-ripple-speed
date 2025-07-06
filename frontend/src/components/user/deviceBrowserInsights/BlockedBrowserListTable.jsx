import React, { useEffect, useState } from 'react';

const mockGaData = [
    { pagePath: '/home', bounceRate: '0.92', averageSessionDuration: '45', browser: 'Chrome', date: '2025-05-01' },
    { pagePath: '/api/data', bounceRate: '0.30', averageSessionDuration: '60', browser: 'Safari', date: '2025-05-02' },
    { pagePath: '/admin/settings', bounceRate: '0.40', averageSessionDuration: '400', browser: 'Edge', date: '2025-05-03' },
    { pagePath: '/services', bounceRate: '0.85', averageSessionDuration: '2', browser: 'Firefox', date: '2025-05-04' },
    { pagePath: '/dashboard', bounceRate: '0.20', averageSessionDuration: '2000', browser: 'HeadlessChrome', date: '2025-05-05' },
];

const BlockedBrowserListTable = ({ gaData = mockGaData, blockedBrowsers = [] }) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const browserMap = new Map();

        gaData.forEach((row) => {
            const bounce = parseFloat(row.bounceRate);
            const duration = parseFloat(row.averageSessionDuration);
            const browser = row.browser?.trim() || 'Unknown';
            const path = row.pagePath?.toLowerCase() || '';

            let reason = '';
            if (browser.toLowerCase().includes('headless')) {
                reason = 'Bot Access';
            } else if (bounce >= 0.9) {
                reason = 'High Bounce Rate';
            } else if (duration <= 3) {
                reason = 'Very Short Visit';
            } else if (duration >= 1800) {
                reason = 'Suspicious Long Visit';
            } else if (path.includes('/api')) {
                reason = 'API Endpoint Visit';
            } else if (path.includes('/admin')) {
                reason = 'Admin Page Visit';
            }

            if (reason) {
                if (browserMap.has(browser)) {
                    const entry = browserMap.get(browser);
                    entry.count += 1;
                    entry.reasons.add(reason);
                } else {
                    browserMap.set(browser, {
                        browser,
                        reasons: new Set([reason]),
                        count: 1,
                    });
                }
            }
        });

        let result = Array.from(browserMap.values()).map((entry) => ({
            browser: entry.browser,
            reasons: Array.from(entry.reasons).join(', '),
            count: entry.count,
        }));

        // ✅ Apply browser filter
        result = blockedBrowsers.length > 0
            ? result.filter((b) => blockedBrowsers.includes(b.browser))
            : result;

        setFilteredData(result);
    }, [gaData, blockedBrowsers]);

    return (
        <div className="w-full relative">
            <div className="h-[320px] overflow-auto relative">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-green-100">
                        <tr className="text-gray-800 text-sm font-semibold">
                            <th className="p-3 px-6">Blocked Browser</th>
                            <th className="p-3">Reason for Blocking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50 text-sm">
                                    <td className="p-3 px-6">{item.browser}</td>
                                    <td className="p-3">{item.reasons}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center p-6 text-gray-500">
                                    No suspicious browser activity detected.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlockedBrowserListTable;