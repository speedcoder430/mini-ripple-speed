import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { parse, format } from 'date-fns';

const VisitorSessionDurationChart = ({ gaData }) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                id: 'area-datetime',
                type: 'area',
                height: 380,
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
            title: {
                text: 'Visitor Session Duration',
                style: { fontSize: '14px', fontWeight: 'bold' }
            },
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
        <div className='w-full border border-gray-100 bg-white rounded-lg px-4 pt-4'>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={380}
            />
        </div>
    );
};

export default VisitorSessionDurationChart;
