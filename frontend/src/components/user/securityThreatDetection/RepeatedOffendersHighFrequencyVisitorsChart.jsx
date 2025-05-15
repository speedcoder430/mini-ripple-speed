import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Mock data with numeric values
const mockGaData = [
    { repeatedOffenders: 4, frequentVisitors: 10, repeatVisitors: 6, loyalUsers: 2 },
    { repeatedOffenders: 2, frequentVisitors: 8, repeatVisitors: 7, loyalUsers: 3 },
    { repeatedOffenders: 3, frequentVisitors: 9, repeatVisitors: 5, loyalUsers: 4 },
];

const RepeatedVisitorsChart = ({ gaData = mockGaData }) => {
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
        let repeated = 0, frequent = 0, repeat = 0, loyal = 0;

        gaData.forEach(row => {
            repeated += row.repeatedOffenders || 0;
            frequent += row.frequentVisitors || 0;
            repeat += row.repeatVisitors || 0;
            loyal += row.loyalUsers || 0;
        });

        const avgRepeated = Math.round(repeated / total);
        const avgFrequent = Math.round(frequent / total);
        const avgRepeat = Math.round(repeat / total);
        const avgLoyal = Math.round(loyal / total);

        const categories = ['Repeated Offenders', 'Frequent Visitors', 'Repeat Visitors', 'Loyal Users'];
        const seriesData = [
            { x: 'Repeated Offenders', y: avgRepeated },
            { x: 'Frequent Visitors', y: avgFrequent },
            { x: 'Repeat Visitors', y: avgRepeat },
            { x: 'Loyal Users', y: avgLoyal },
        ];

        setChartData((prev) => ({
            ...prev,
            series: [{ name: 'User Counts', data: seriesData }],
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

export default RepeatedVisitorsChart;
