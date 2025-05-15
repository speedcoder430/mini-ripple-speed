import React from 'react';

const mockReferralData = [
    {
        domain: 'Google',
        source: 'Organic Search',
        visitors: '50%',
        conversions: '12%',
    },
    {
        domain: 'Facebook',
        source: 'Social Media',
        visitors: '25%',
        conversions: '8%',
    },
    {
        domain: 'Twitter/X',
        source: 'Social Media',
        visitors: '10%',
        conversions: '4%',
    },
    {
        domain: 'LinkedIn',
        source: 'Social Media',
        visitors: '8%',
        conversions: '3%',
    },
    {
        domain: 'Other Websites',
        source: 'Backlinks',
        visitors: '7%',
        conversions: '2%',
    },
];

const ReferralDomainsExternalTrafficTable = ({ data = mockReferralData }) => {
    return (
        <div className='w-full relative'>
            <div className='h-[320px] overflow-auto relative'>
                <table className='w-full text-left border-collapse'>
                    <thead className='sticky top-0 z-10 bg-blue-200'>
                        <tr className='text-gray-700 text-sm'>
                            <th className='p-3 px-6'>Referral Domain</th>
                            <th className='p-3'>Traffic Source</th>
                            <th className='p-3'>Visitors (%)</th>
                            <th className='p-3'>Conversions (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, idx) => (
                                <tr key={idx} className='border-b hover:bg-gray-50 text-sm'>
                                    <td className='p-3 px-6'>{item.domain}</td>
                                    <td className='p-3'>{item.source}</td>
                                    <td className='p-3'>{item.visitors}</td>
                                    <td className='p-3'>{item.conversions}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='text-center p-6 text-gray-500'>
                                    No traffic data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReferralDomainsExternalTrafficTable;
