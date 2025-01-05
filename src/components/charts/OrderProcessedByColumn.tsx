'use client'
import React from 'react'
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IOrderActionBy } from '@/shared/types/order'
import BaseEmpty from '../layouts/BaseEmpty'

const OrderProcessedByColumn = ({ data }: { data: IOrderActionBy[] | undefined }) => {
  if (!data) {
    return <BaseEmpty />
  }

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
      categories: data?.map((e) => e.name),
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
        data: data?.map((e) => e.order),
        color: '#4f46e5',
        yAxis: 0, // Bind to the primary yAxis
      },
      {
        type: 'column',
        name: 'Total Values',
        data: data?.map((e) => e.total_value),
        color: '#fe6a35',
        yAxis: 1, // Bind to the secondary yAxis
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
  }

  return (
    <div className="w-full h-[500px] p-4 bg-white rounded-lg shadow-sm">
      <div className="flex p-4 justify-between items-center">
        <div className="font-semibold text-lg">Orders processed by</div>
      </div>
      {typeof window !== 'undefined' && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  )
}

export default OrderProcessedByColumn
