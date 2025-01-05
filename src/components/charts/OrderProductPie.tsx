'use client'
import React from 'react'
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IProductRatioOverview } from '@/shared/types/order'
import BaseEmpty from '../layouts/BaseEmpty'

const OrderProductPie = ({ data }: { data: IProductRatioOverview[] | undefined }) => {
  if (!data) {
    return <BaseEmpty />
  }

  const total =
    data?.reduce((sum, curr) => {
      return sum + curr.count
    }, 0) || 0

  const options: Options | any = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: `Percentage: {point.y}<br/>Count: {point.x}`,
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '0.8em',
              textOutline: 'none',
              opacity: 0.7,
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Percentage',
        data: data?.map((e) => {
          return {
            name: e.name,
            x: e.count,
            y: +((e.count * 100) / total).toFixed(2),
          }
        }),
      },
    ],
  }

  return (
    <div className="w-full h-[500px] bg-white rounded-lg shadow-sm">
      <div className="flex p-4 justify-between items-center">
        <div className="font-semibold text-lg">Product ratio</div>
      </div>
      {typeof window !== 'undefined' && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  )
}

export default OrderProductPie
