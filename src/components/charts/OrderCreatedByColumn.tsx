'use client';
import React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const OrderCreatedByColumn = () => {
  const options: Options = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Inter, sans-serif',
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['a', 'b', 'c'],
      crosshair: true,
    },
    yAxis: [
      {
        title: {
          text: 'Orders',
        },
        labels: {
          format: '{value}',
        },
      },
      {
        title: {
          text: 'Total Values',
        },
        labels: {
          format: '{value}',
        },
        opposite: true,
      },
    ],
    plotOptions: {
      column: {
        borderRadius: 5,
        colorByPoint: false,
      },
    },
    series: [
      {
        type: 'column',
        name: 'Orders',
        data: [3, 2, 5],
        color: '#4f46e5',
        yAxis: 0,
      },
      {
        type: 'column',
        name: 'Total Values',
        data: [100, 200, 800],
        color: '#fe6a35',
        yAxis: 1,
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>',
    },
  };

  return (
    <div className="w-full h-[500px] p-4 bg-white rounded-lg shadow-sm">
      <div className="flex p-4 justify-between items-center">
        <div className="font-semibold text-lg">Orders created by</div>
      </div>
      {typeof window !== 'undefined' && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default OrderCreatedByColumn;
