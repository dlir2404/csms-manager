'use client';
import React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
  const options: Options = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: {
      text: 'Monthly Orders',
      align: 'left',
      style: {
        fontWeight: 'bold'
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      crosshair: true
    },
    yAxis: {
      title: {
        text: 'Revenue ($)'
      }
    },
    plotOptions: {
      column: {
        borderRadius: 5,
        colorByPoint: false
      }
    },
    series: [{
      type: 'column',
      name: 'Revenue',
      data: [400, 300, 600, 800, 500, 700],
      color: '#4f46e5'
    }],
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '${point.y}'
    }
  };

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow-sm">
      {typeof window !== 'undefined' && (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      )}
    </div>
  );
};

export default PieChart;