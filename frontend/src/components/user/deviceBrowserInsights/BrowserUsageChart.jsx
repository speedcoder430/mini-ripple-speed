import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Mock data using browser usage counts
const mockGaData = [
    { chrome: 120, safari: 45, edge: 30, firefox: 25, opera: 12, other: 8 },
    { chrome: 110, safari: 40, edge: 28, firefox: 22, opera: 15, other: 10 },
    { chrome: 130, safari: 50, edge: 33, firefox: 27, opera: 13, other: 9 },
];

const BrowserUsageChart = ({ gaData = mockGaData }) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 260,
                type: 'bar',
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    columnWidth: '32px',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    dataLabels: { position: 'top' },
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
                categories: [],
                labels: {
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        colors: ['#333'],
                    },
                    rotate: -10,
                    offsetY: 5,
                },
            },
        },
    });

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const total = gaData.length;
        const sums = {
            Chrome: 0,
            Safari: 0,
            Edge: 0,
            Firefox: 0,
            Opera: 0,
            Other: 0,
        };

        gaData.forEach(row => {
            sums.Chrome += row.chrome || 0;
            sums.Safari += row.safari || 0;
            sums.Edge += row.edge || 0;
            sums.Firefox += row.firefox || 0;
            sums.Opera += row.opera || 0;
            sums.Other += row.other || 0;
        });

        const averages = Object.entries(sums).map(([browser, totalCount]) => ({
            x: browser,
            y: Math.round(totalCount / total),
        }));

        const categories = averages.map(item => item.x);

        setChartData(prev => ({
            ...prev,
            series: [{ name: 'Avg Users', data: averages }],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories,
                },
            },
        }));
    }, [gaData]);

    return (
        <div className="w-full">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={260}
            />
        </div>
    );
};

export default BrowserUsageChart;
