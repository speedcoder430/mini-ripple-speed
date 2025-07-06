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
  

const SuspiciousActivityAlertsTable = ({ gaData = [] }) => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        // If data already contains alerts, assume it's real
        setAlerts(gaData);
    }, [gaData]);

    return (
        <div className='w-full relative'>
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
