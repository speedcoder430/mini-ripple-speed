import React, { useEffect, useState } from 'react';

const SuspiciousActivityAlertsTable = ({ gaData }) => {
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
                    ip: `Unknown-${index + 1}`,
                    type: reason,
                    date: row.date || 'Unknown',
                    status: 'Flagged',
                };
            });

        setAlerts(suspicious);
    }, [gaData]);

    return (
        <div className='w-full border border-gray-100 rounded-lg bg-white relative mb-6'>
            <h3 className='text-sm font-bold text-gray-700 px-6 py-4 pb-6'>
                Suspicious Activity Alerts
            </h3>
            <div className='h-[320px] overflow-auto relative'>
                <table className='w-full text-left border-collapse'>
                    <thead className='sticky top-0 z-10 bg-blue-200'>
                        <tr className='text-gray-700 text-sm'>
                            <th className='p-3 px-6'>IP Address</th>
                            <th className='p-3'>Type</th>
                            <th className='p-3'>Date</th>
                            <th className='p-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length > 0 ? (
                            alerts.map((item, idx) => (
                                <tr key={idx} className='border-b hover:bg-gray-50 text-sm'>
                                    <td className='p-3 px-6'>{item.ip}</td>
                                    <td className='p-3'>{item.type}</td>
                                    <td className='p-3'>{item.date}</td>
                                    <td className='p-3 font-semibold text-orange-500'>
                                        {item.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='text-center p-6 text-gray-500'>
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

export default SuspiciousActivityAlertsTable;
