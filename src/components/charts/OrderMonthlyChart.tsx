'use client';
import React, { useState } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetOrderMonthlyStatistic } from '@/services/order.service';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const OrderMonthlyChart = () => {
  const [day, setDay] = useState<dayjs.Dayjs>(dayjs())
  const {data, isLoading} = useGetOrderMonthlyStatistic({
    year: day.year()
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  const options: Options = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: data?.map((item: any) => item.month),
      crosshair: true
    },
    yAxis: {
      title: {
        text: 'Orders'
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
      name: 'Month',
      data: data?.map((item: any) => item.count),
      color: '#4f46e5'
    }],
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{point.y} orders'
    }
  };

  const onChange = (date: dayjs.Dayjs) => {
    setDay(date)
  }

  return (
    <div className="w-full h-[500px] p-4 bg-white rounded-lg shadow-sm">
      
      <div className='flex p-4 justify-between items-center'>
        <div className='font-bold text-xl'>Monthly orders</div>
        <div><DatePicker value={day} onChange={onChange} picker="year" /></div>
      </div>
      {typeof window !== 'undefined' && (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      )}
    </div>
  );
};

export default OrderMonthlyChart;