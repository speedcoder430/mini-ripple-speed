import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DeviceUsageStatisticsChart = ({ gaData }) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 420,
                type: 'bar',
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    columnWidth: '32px',
                    borderRadius: 8,
                    dataLabels: {
                        position: 'top',
                    },
                },
            },
            dataLabels: {
                enabled: true,
                formatter: (val) => val,
                offsetY: -20,
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    colors: ['#cfdaf2'],
                },
                background: {
                    enabled: true,
                    foreColor: '#000',
                    padding: 4,
                    borderRadius: 2,
                    opacity: 0.9,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#3a76d0'],
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            colors: ['#4cae50', '#ff9901', '#2195f2'],
            xaxis: {
                type: 'category',
                categories: ['Mobile', 'Desktop', 'Tablet'],
                labels: {
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        colors: ['#333'],
                    },
                    rotate: -45,
                    offsetY: 5,
                },
            },
            title: {
                text: 'Device Usage Statistics',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#2d3748',
                },
            },
            legend: {
                show: false,
            },
        },
    });

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const counts = {
            mobile: 0,
            desktop: 0,
            tablet: 0,
        };

        gaData.forEach((row) => {
            const device = row.deviceCategory?.toLowerCase();
            const sessions = parseInt(row.sessions) || 0;

            if (device === 'mobile') counts.mobile += sessions;
            else if (device === 'desktop') counts.desktop += sessions;
            else if (device === 'tablet') counts.tablet += sessions;
        });

        setChartData((prev) => ({
            ...prev,
            series: [
                {
                    name: 'Sessions',
                    data: [counts.mobile, counts.desktop, counts.tablet],
                },
            ],
        }));
    }, [gaData]);

    return (
        <div className='w-full pl-4 pt-4 border border-gray-100 rounded-lg flex-1 bg-white'>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={400}
            />
        </div>
    );
};

export default DeviceUsageStatisticsChart;
