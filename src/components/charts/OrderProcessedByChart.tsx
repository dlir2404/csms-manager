'use client';
import React, { useState } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useGetOrderProcessedByStatistic } from '@/services/order.service';

const { RangePicker } = DatePicker;

const OrderCreatedByChart = () => {
  const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs(),
    dayjs(),
  ]);

  const { data, isLoading } = useGetOrderProcessedByStatistic({
    from: range[0].toISOString(),
    to: range[1].toISOString(),
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        data: [
          {
            name: 'Water',
            y: 55.02,
          },
          {
            name: 'Fat',
            // sliced: true,
            // selected: true,
            y: 26.71,
          },
          {
            name: 'Carbohydrates',
            y: 1.09,
          },
          {
            name: 'Protein',
            y: 15.5,
          },
          {
            name: 'Ash',
            y: 1.68,
          },
        ],
      },
    ],
  };

  const onChange = (range: any) => {
    setRange(range);
  };

  return (
    <div className="w-full h-[500px] p-4 bg-white rounded-lg shadow-sm">
      <div className="flex p-4 justify-between items-center">
        <div className="font-bold text-xl">Orders processed by</div>
        <div>
          <RangePicker value={range} onChange={onChange} picker="month" />
        </div>
      </div>
      {typeof window !== 'undefined' && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default OrderCreatedByChart;
