'use client';
import React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const OrderStatusPie = () => {
  // const { data, isLoading } = useGetOrderCreatedByStatistic({
  // });

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-full text-center align-middle">Loading...</div>
  //   );
  // }

  // if (!isLoading && (!data || !data?.length)) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center">
  //       <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  //     </div>
  //   );
  // }

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

  return (
    <div className="w-full h-[500px] bg-white rounded-lg shadow-sm">
      <div className="flex p-4 justify-between items-center">
        <div className="font-semibold text-lg">Orders status</div>
      </div>
      {typeof window !== 'undefined' && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default OrderStatusPie;
