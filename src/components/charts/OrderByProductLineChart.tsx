// UserActivityChart.tsx
'use client'
import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useGetOrderStatisticByProduct } from '@/services/order.service';

const OrderByProductLineChart = () => {
    const [day, setDay] = useState<dayjs.Dayjs>(dayjs())

    const { data } = useGetOrderStatisticByProduct({
        month: day.month() + 1,
        year: day.year(),
    })

    // Process the data to create series
    const series: Highcharts.SeriesOptionsType[] = data?.map((user: any) => ({
        type: 'line',
        name: user.name,
        data: user.data.map((item: any) => ({
            x: new Date(item.day).getTime(),
            y: item.count
        }))
    }));

    const options: Highcharts.Options = {
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Count'
            },
            min: 0
        },
        series,
        plotOptions: {
            line: {
                marker: {
                    enabled: true
                }
            }
        },
        tooltip: {
            formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
                return `<b>${this.series.name}</b><br/>
                Date: ${Highcharts.dateFormat('%Y-%m-%d', +(this?.x || 0))}<br/>
                Orders: ${this.y}`;
            }
        },
        legend: {
            enabled: true
        }
    };

    const onChange = (date: dayjs.Dayjs) => {
        setDay(date)
    }

    return (
        <div className='bg-white'>
            <div className="flex p-4 justify-between items-center">
                <div className="font-bold text-xl">Orders number of each product</div>
                <div>
                    <DatePicker value={day} onChange={onChange} picker="month" />
                </div>
            </div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default OrderByProductLineChart;