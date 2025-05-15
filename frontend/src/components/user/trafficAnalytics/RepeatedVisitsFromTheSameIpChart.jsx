import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Mock data: Just IP and visit counts
const mockGaData = [
    { ipAddress: '192.168.1.1', screenPageViews: '3' },
    { ipAddress: '192.168.1.2', screenPageViews: '1' },
    { ipAddress: '192.168.1.1', screenPageViews: '2' },
    { ipAddress: '192.168.1.3', screenPageViews: '4' },
    { ipAddress: '192.168.1.2', screenPageViews: '2' },
    { ipAddress: '192.168.1.4', screenPageViews: '1' },
    { ipAddress: '192.168.1.3', screenPageViews: '1' },
    { ipAddress: '192.168.1.1', screenPageViews: '1' },
    { ipAddress: '192.168.1.2', screenPageViews: '2' },
];

const RepeatedVisitsFromTheSameIpChart = ({ gaData = mockGaData }) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 380,
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
        if (!Array.isArray(gaData)) return;

        const ipCountMap = {};

        gaData.forEach(({ ipAddress, screenPageViews }) => {
            if (!ipAddress || isNaN(screenPageViews)) return;
            const views = parseInt(screenPageViews, 10);
            ipCountMap[ipAddress] = (ipCountMap[ipAddress] || 0) + views;
        });

        const topIps = Object.entries(ipCountMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const categories = topIps.map(([ip]) => ip);
        const seriesData = topIps.map(([ip, views]) => ({ x: ip, y: views }));

        setChartData((prev) => ({
            ...prev,
            series: [{ name: 'Total Visits', data: seriesData }],
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
                height={290}
            />
        </div>
    );
};

export default RepeatedVisitsFromTheSameIpChart;
