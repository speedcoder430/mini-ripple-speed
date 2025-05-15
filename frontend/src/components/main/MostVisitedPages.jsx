import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Function to map URL paths to readable page names
const mapPathToPageName = (path) => {
    const pathMap = {
        '/': 'Home',
        '/dashboard': 'Dashboard',
        '/contact-us': 'Contact Us',
        '/about': 'About',
        '/services': 'Services',
        '/faq': 'FAQ',
        '/login': 'Login',
        // Add more mappings as needed
    };

    return pathMap[path] || (
        path.replace('/', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase()) || 'Unknown'
    );
};

const MostVisitedPagesChart = ({ gaData }) => {
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
            title: {
                text: 'Most Visited Pages',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#2d3748',
                },
            },
        },
    });

    useEffect(() => {
        if (!Array.isArray(gaData)) return;

        const pageViewsMap = {};

        gaData.forEach(({ pagePath, screenPageViews }) => {
            if (!pagePath || isNaN(screenPageViews)) return;
            const views = parseInt(screenPageViews, 10);
            if (!pageViewsMap[pagePath]) pageViewsMap[pagePath] = 0;
            pageViewsMap[pagePath] += views;
        });

        const sortedPages = Object.entries(pageViewsMap)
            .map(([path, views]) => ({
                path,
                views,
                name: mapPathToPageName(path),
            }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 5); // Top 5 pages

        const categories = sortedPages.map(item => item.name);
        const seriesData = sortedPages.map(item => ({ x: item.name, y: item.views }));

        setChartData((prev) => ({
            ...prev,
            series: [{ name: 'Page Views', data: seriesData }],
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
        <div className='w-full pl-4 pt-4 border border-gray-100 bg-white rounded-lg mb-6'>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type='bar'
                height={380}
            />
        </div>
    );
};

export default MostVisitedPagesChart;
