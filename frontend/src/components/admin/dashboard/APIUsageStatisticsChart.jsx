import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Mock data format for API usage
const mockApiUsageData = [
    { service: 'Cloudflare', usageCount: 120 },
    { service: 'Google Analytics', usageCount: 95 },
    { service: 'MaxMind', usageCount: 75 },
    { service: 'IPinfo', usageCount: 55 },
    { service: 'Slack', usageCount: 45 },
    { service: 'Zapier', usageCount: 30 },
];

const APIUsageStatisticsChart = ({ apiData = mockApiUsageData }) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 400,
                type: 'bar',
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    columnWidth: '32px',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
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
                    gradientToColors: ['#254ca6'],
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            colors: ['#3a76d0'],
            xaxis: {
                type: 'category',
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
        },
    });

    useEffect(() => {
        if (!Array.isArray(apiData)) return;

        const sortedData = [...apiData]
            .filter(item => item.service && !isNaN(item.usageCount))
            .sort((a, b) => b.usageCount - a.usageCount)
            .slice(0, 6); // Top 6 services

        const categories = sortedData.map(item => item.service);
        const seriesData = sortedData.map(item => ({ x: item.service, y: item.usageCount }));

        setChartData((prev) => ({
            ...prev,
            series: [{ name: 'API Calls', data: seriesData }],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories,
                },
            },
        }));
    }, [apiData]);

    return (
        <div className='w-full'>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type='bar'
                height={320}
            />
        </div>
    );
};

export default APIUsageStatisticsChart;
