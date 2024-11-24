'use client';
import React, { useState } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const OrderCreatedByChart = () => {
    const [day, setDay] = useState<dayjs.Dayjs>(dayjs())

    const options: Options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -60,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '0.8em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: [
                    {
                        name: 'Water',
                        y: 55.02
                    },
                    {
                        name: 'Fat',
                        // sliced: true,
                        // selected: true,
                        y: 26.71
                    },
                    {
                        name: 'Carbohydrates',
                        y: 1.09
                    },
                    {
                        name: 'Protein',
                        y: 15.5
                    },
                    {
                        name: 'Ash',
                        y: 1.68
                    }
                ]
            },
        ]
    }

    const onChange = (date: dayjs.Dayjs) => {
        setDay(date)
    }

    return (
        <div className="w-full h-[500px] p-4 bg-white rounded-lg shadow-sm">
            <div className='flex p-4 justify-between items-center'>
                <div className='font-bold text-xl'>Orders created by</div>
                <div><DatePicker value={day} onChange={onChange} picker="month" /></div>
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

export default OrderCreatedByChart;