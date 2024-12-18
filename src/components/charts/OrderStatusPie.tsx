'use client';
import React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import BaseLoading from '../layouts/BaseLoading';
import BaseEmpty from '../layouts/BaseEmpty';
import { IOrderStatusOverview } from '@/shared/types/order';

const OrderStatusPie = ({
  statuses
}: {
  statuses: IOrderStatusOverview[] | undefined
}) => {
  if (!statuses) {
    return <BaseLoading />
  }

  const total = statuses?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0)

  const options: Options | any = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
    },
    tooltip: {
      valueSuffix: '%',
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
            distance: -60,
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
        data: statuses?.map((status) => {
          return {
            name: status.status,
            y: +((status.count) * 100 / total).toFixed(2)
          }
        }),
      },
    ],
  };

  return (
    <div className="w-full h-[500px] bg-white rounded-lg shadow-sm">
      <div className="flex p-4 justify-between items-center">
        <div className="font-semibold text-lg">Orders status</div>
      </div>
      {typeof window !== 'undefined' && (
        <>
          {total == 0
            ? <BaseEmpty />
            : <HighchartsReact highcharts={Highcharts} options={options} />
          }
        </>
      )}
    </div>
  );
};

export default OrderStatusPie
