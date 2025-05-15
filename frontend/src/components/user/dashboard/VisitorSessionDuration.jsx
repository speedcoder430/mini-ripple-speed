import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { parse, format } from 'date-fns';

const mockGaData = [
    { dateHour: '2025050109', averageSessionDuration: 120 },  // May 1, 9AM
    { dateHour: '2025050109', averageSessionDuration: 180 },
    { dateHour: '2025050110', averageSessionDuration: 90 },   // May 1, 10AM
    { dateHour: '2025050209', averageSessionDuration: 300 },  // May 2
    { dateHour: '2025050209', averageSessionDuration: 240 },
    { dateHour: '2025050211', averageSessionDuration: 180 },
    { dateHour: '2025050309', averageSessionDuration: 60 },   // May 3
    { dateHour: '2025050309', averageSessionDuration: 30 },
    { dateHour: '2025050312', averageSessionDuration: 45 },
];

const VisitorSessionDurationChart = ({ gaData = mockGaData }) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                id: 'area-datetime',
                type: 'area',
                height: 280,
                toolbar: { show: false },
                zoom: { autoScaleYaxis: true },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#599feb'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.4,
                    opacityFrom: 0.9,
                    opacityTo: 0.1,
                    stops: [0, 90, 100]
                },
            },
            xaxis: {
                type: 'datetime',
                categories: [],
                labels: {
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        colors: ['#333']
                    },
                    format: 'MMM d'
                }
            },
            yaxis: {
                show: true,
                axisBorder: {
                    show: true,
                    color: '#ccc'
                },
                labels: {
                    show: true,
                    formatter: (value) => `${value.toFixed(2)} min`,
                    style: {
                        colors: '#333',
                        fontSize: '12px'
                    }
                }
            },
            grid: { show: false },
            dataLabels: { enabled: false },
        }
    });

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const dateMap = {};

        gaData.forEach(({ dateHour, averageSessionDuration }) => {
            if (!dateHour || isNaN(averageSessionDuration)) return;
            const fullDate = parse(dateHour, 'yyyyMMddHH', new Date());
            const date = format(fullDate, 'yyyy-MM-dd');
            if (!dateMap[date]) {
                dateMap[date] = { total: 0, count: 0 };
            }
            dateMap[date].total += Number(averageSessionDuration);
            dateMap[date].count += 1;
        });

        const sortedDates = Object.keys(dateMap).sort();
        const averagesInMinutes = sortedDates.map(date =>
            parseFloat((dateMap[date].total / dateMap[date].count / 60).toFixed(2))
        );

        const formattedDates = sortedDates.map(date => {
            const parsed = parse(date, 'yyyy-MM-dd', new Date());
            return parsed.toISOString();
        });

        setChartData(prev => ({
            ...prev,
            series: [
                {
                    name: 'Avg Session Duration (min)',
                    data: averagesInMinutes
                }
            ],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: formattedDates
                }
            }
        }));
    }, [gaData]);

    return (
        <div className='w-full'>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={280}
            />
        </div>
    );
};

export default VisitorSessionDurationChart;
