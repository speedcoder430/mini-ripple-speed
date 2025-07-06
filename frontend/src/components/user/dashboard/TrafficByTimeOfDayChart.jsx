import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const TrafficByTimeOfDayChart = () => {
    const [seriesData, setSeriesData] = useState([]);

    const hours = [
        '12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM',
        '2PM', '4PM', '6PM', '8PM', '10PM'
    ];

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/v2/dashboard/traffic/day-by-time');
                const data = res.data?.data || [];
                const heatMap = {};
                for (const day of days) {
                    heatMap[day] = {};
                    for (const hour of hours) {
                        heatMap[day][hour] = 0;
                    }
                }
                data.forEach(dayEntry => {
                    const { day, hours: hourEntries } = dayEntry;
                    if (!day || !Array.isArray(hourEntries)) return;

                    hourEntries.forEach(({ hour, count }) => {
                        if (hours.includes(hour)) {
                            heatMap[day][hour] = count;
                        }
                    });
                });
                const transformed = days
                    .slice()
                    .reverse()
                    .map((day) => ({
                        name: day.slice(0, 3), // e.g. "Sun"
                        data: hours.map((hour) => ({
                            x: hour,
                            y: heatMap[day][hour],
                        })),
                    }));

                setSeriesData(transformed);
            } catch (err) {
                console.error('Failed to fetch heatmap data:', err);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        series: seriesData,
        options: {
            chart: {
                height: 400,
                type: 'heatmap',
                toolbar: { show: false },
            },
            dataLabels: { enabled: false },
            colors: ['#e0f0ff', '#0070f3'],
            xaxis: {
                type: 'category',
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500,
                        colors: '#444',
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500,
                        colors: '#444',
                    },
                },
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    radius: 4,
                    useFillColorAsStroke: false,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 5, color: '#f0f8ff' },
                            { from: 5, to: 10, color: '#a0c4ff' },
                            { from: 10, to: 20, color: '#5b9bff' },
                            { from: 20, to: 30, color: '#004ecb' },
                            { from: 30, to: 9999, color: '#002d99' }
                        ],
                    },
                },
            },
            tooltip: {
                theme: 'light',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Arial',
                },
            },
        },
    };

    return (
        <div className="w-full">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="heatmap"
                height={420}
            />
        </div>
    );
};

export default TrafficByTimeOfDayChart;
