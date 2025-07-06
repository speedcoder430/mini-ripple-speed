import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Map common page paths to readable names
const mapPathToPageName = (path) => {
  const pathMap = {
    '/': 'Home',
    '/dashboard': 'Dashboard',
    '/contact-us': 'Contact Us',
    '/about': 'About',
    '/services': 'Services',
    '/faq': 'FAQ',
    '/login': 'Login',
  };

  if (!path || typeof path !== 'string') return 'Unknown';

  return pathMap[path] || (
    path.replace('/', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase()) || 'Unknown'
  );
};

const MostVisitedPagesChart = ({ gaData = [] }) => {
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
      }
    },
  });

  useEffect(() => {
    if (!Array.isArray(gaData) || gaData.length === 0) {
      setChartData(prev => ({ ...prev, series: [] }));
      return;
    }

    const pageViewsMap = {};

    for (const row of gaData) {
      const path = row.pagePath;
      const views = parseInt(row.screenPageViews, 10);

      if (!path || isNaN(views)) continue;

      pageViewsMap[path] = (pageViewsMap[path] || 0) + views;
    }

    const sortedPages = Object.entries(pageViewsMap)
      .map(([path, views]) => ({
        path,
        views,
        name: mapPathToPageName(path),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5); // Top 5

    const categories = sortedPages.map(item => item.name);
    const seriesData = sortedPages.map(item => ({ x: item.name, y: item.views }));

    setChartData(prev => ({
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
    <div className='w-full'>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height={290}
      />
    </div>
  );
};

export default MostVisitedPagesChart;
