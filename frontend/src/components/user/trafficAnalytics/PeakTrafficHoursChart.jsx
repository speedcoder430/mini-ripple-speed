import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { parse, getDay, getHours } from 'date-fns';

const mockGaData = [
    { dateHour: '2025042810', sessions: '5' },  // Monday, 10am
    { dateHour: '2025042812', sessions: '8' },  // Monday, 12pm
    { dateHour: '2025042914', sessions: '12' }, // Tuesday, 2pm
    { dateHour: '2025043018', sessions: '20' }, // Wednesday, 6pm
    { dateHour: '2025050116', sessions: '25' }, // Thursday, 4pm
    { dateHour: '2025050210', sessions: '15' }, // Friday, 10am
    { dateHour: '2025050302', sessions: '3' },  // Saturday, 2am
    { dateHour: '2025050410', sessions: '7' },  // Sunday, 10am
    { dateHour: '2025050416', sessions: '10' }, // Sunday, 4pm
];

const PeakTrafficHoursChart = ({ gaData = mockGaData }) => {
    const [seriesData, setSeriesData] = useState([]);

    const hours = [
        '12am', '2am', '4am', '6am', '8am', '10am', '12pm',
        '2pm', '4pm', '6pm', '8pm', '10pm'
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getHourSlot = (hour) => {
        if (hour < 1) return '12am';
        if (hour < 3) return '2am';
        if (hour < 5) return '4am';
        if (hour < 7) return '6am';
        if (hour < 9) return '8am';
        if (hour < 11) return '10am';
        if (hour < 13) return '12pm';
        if (hour < 15) return '2pm';
        if (hour < 17) return '4pm';
        if (hour < 19) return '6pm';
        if (hour < 21) return '8pm';
        return '10pm';
    };

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const heatMap = {};
        for (const day of days) {
            heatMap[day] = {};
            for (const hour of hours) {
                heatMap[day][hour] = 0;
            }
        }

        for (const row of gaData) {
            if (!row.dateHour || !row.sessions) continue;

            const dateTime = parse(row.dateHour, 'yyyyMMddHH', new Date());
            if (isNaN(dateTime)) continue;

            const sessions = parseInt(row.sessions) || 0;
            const dayLabel = days[getDay(dateTime)];
            const hourSlot = getHourSlot(getHours(dateTime));

            heatMap[dayLabel][hourSlot] += sessions;
        }

        const transformed = days
            .slice()
            .reverse()
            .map((day) => ({
                name: day,
                data: hours.map((hour) => ({
                    x: hour,
                    y: heatMap[day][hour],
                })),
            }));

        setSeriesData(transformed);
    }, [gaData]);

    const chartData = {
        series: seriesData,
        options: {
            chart: {
                height: 320,
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
                height={320}
            />
        </div>
    );
};

export default PeakTrafficHoursChart;