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

const TrafficAnomaliesRiskAnalysisTable = ({ gaData = mockGaData }) => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const suspicious = gaData
            .map((row, index) => {
                const bounce = parseFloat(row.bounceRate);
                const duration = parseFloat(row.averageSessionDuration);
                const browser = row.browser?.toLowerCase() || '';
                const path = row.pagePath?.toLowerCase() || '';
                const date = row.date || 'Unknown';

                if (browser.includes('headless')) {
                    return {
                        type: 'Bot Traffic Detected',
                        description: 'Automated tool accessed the site',
                        impact: 'Skewed analytics, security concerns',
                        risk: 'High',
                        date,
                    };
                }
                if (bounce >= 0.9) {
                    return {
                        type: 'Traffic Drop',
                        description: 'Unusually high bounce rate',
                        impact: 'SEO issues, irrelevant traffic',
                        risk: 'Medium',
                        date,
                    };
                }
                if (duration <= 3) {
                    return {
                        type: 'Very Short Sessions',
                        description: 'Users left almost immediately',
                        impact: 'Poor content engagement, possible bot hits',
                        risk: 'Medium',
                        date,
                    };
                }
                if (duration >= 1800) {
                    return {
                        type: 'Unusual Long Session',
                        description: 'Session lasted unusually long',
                        impact: 'Potential automation or user error',
                        risk: 'Low',
                        date,
                    };
                }
                if (path.includes('/api')) {
                    return {
                        type: 'Suspicious API Access',
                        description: 'API endpoint visited via browser',
                        impact: 'Potential scraping or misuse',
                        risk: 'Medium',
                        date,
                    };
                }
                if (path.includes('/admin')) {
                    return {
                        type: 'Admin Page Visit',
                        description: 'Attempted access to admin interface',
                        impact: 'Potential unauthorized access attempt',
                        risk: 'High',
                        date,
                    };
                }

                return null;
            })
            .filter(Boolean);

        setAlerts(suspicious);
    }, [gaData]);

    return (
        <div className='w-full relative'>
            <div className='h-[320px] overflow-auto relative'>
                <table className='w-full text-left border-collapse'>
                    <thead className='sticky top-0 z-10 bg-blue-200'>
                        <tr className='text-gray-700 text-sm'>
                            <th className='p-3 px-6'>Anomaly Type</th>
                            <th className='p-3'>Description</th>
                            <th className='p-3'>Potential Impact</th>
                            <th className='p-3'>Risk Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length > 0 ? (
                            alerts.map((item, idx) => (
                                <tr key={idx} className='border-b hover:bg-gray-50 text-sm'>
                                    <td className='p-3 px-6 font-medium'>{item.type}</td>
                                    <td className='p-3'>{item.description}</td>
                                    <td className='p-3'>{item.impact}</td>
                                    <td className={`p-3 font-semibold ${item.risk === 'High'
                                        ? 'text-red-500'
                                        : item.risk === 'Medium'
                                            ? 'text-yellow-500'
                                            : 'text-green-600'
                                        }`}>
                                        {item.risk}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className='text-center p-6 text-gray-500'>
                                    No anomalies detected.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrafficAnomaliesRiskAnalysisTable;
