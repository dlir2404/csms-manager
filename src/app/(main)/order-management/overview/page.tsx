'use client'
import OrderCreatedByColumn from '@/components/charts/OrderCreatedByColumn'
import OrderDailyChart from '@/components/charts/OrderDailyChart'
import OrderMonthlyChart from '@/components/charts/OrderMonthlyChart'
import OrderProcessedByColumn from '@/components/charts/OrderProcessedByColumn'
import OrderProductPie from '@/components/charts/OrderProductPie'
import OrderStatusPie from '@/components/charts/OrderStatusPie'
import BaseBox from '@/components/statistics/BaseBox'
import { useGetOrderOverview } from '@/services/order.service'
import { IOrderOverview } from '@/shared/types/order'
import { Col, Row } from 'antd'
import React from 'react'

const fakeData: IOrderOverview = {
  today: {
    totalOrders: 10,
    totalOrderValue: 200000,
    avgOrderValue: 50000,
    totalItems: 5,
  },
  yesterday: {
    totalOrders: 2,
    totalOrderValue: 100000,
    avgOrderValue: 20000,
    totalItems: 2,
  },
  statuses: [
    {
      status: 'created',
      count: 3,
    },
    {
      status: 'processing',
      count: 4,
    },
    {
      status: 'completed',
      count: 5,
    },
  ],
  createdBy: [
    {
      username: 'Order taker 1',
      count: 1,
      totalValue: 200000,
    },
    {
      username: 'Order taker 2',
      count: 4,
      totalValue: 500000,
    },
    {
      username: 'Order taker 3',
      count: 2,
      totalValue: 400000,
    },
    {
      username: 'Order taker 4',
      count: 5,
      totalValue: 800000,
    },
  ],
  processBy: [
    {
      username: 'Order taker 1',
      count: 1,
      totalValue: 200000,
    },
    {
      username: 'Order taker 2',
      count: 4,
      totalValue: 500000,
    },
    {
      username: 'Order taker 3',
      count: 2,
      totalValue: 400000,
    },
    {
      username: 'Order taker 4',
      count: 5,
      totalValue: 800000,
    },
  ],
  productRatio: [
    {
      name: 'Product 1',
      count: 10,
    },
    {
      name: 'Product 2',
      count: 12,
    },
    {
      name: 'Product 3',
      count: 15,
    },
    {
      name: 'Product 4',
      count: 7,
    },
    {
      name: 'Product 5',
      count: 1,
    },
  ],
}

export default function Overview() {
  const { data } = useGetOrderOverview();

  // const data = fakeData

  return (
    <div>
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <BaseBox
            showCompare
            title="Total order"
            number={data?.today?.totalOrders || 0}
            compareTo={data?.yesterday?.totalOrders || 0}
          ></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox
            showCompare
            title="Total order value"
            showCurrency
            number={data?.today?.totalOrderValue || 0}
            compareTo={data?.yesterday?.totalOrderValue || 0}
          ></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox
            showCompare
            title="Average order value"
            showCurrency
            number={data?.today?.avgOrderValue || 0}
            compareTo={data?.yesterday?.avgOrderValue || 0}
          ></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox
            showCompare
            title="Average item per order"
            number={data?.today?.totalItems || 0}
            compareTo={data?.yesterday?.totalItems || 0}
          ></BaseBox>
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <OrderStatusPie statuses={data?.statuses} />
        </Col>
        <Col span={16}>
          <OrderCreatedByColumn data={data?.createdBy} />
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <Col span={16}>
          <OrderProcessedByColumn data={data?.processBy} />
        </Col>
        <Col span={8}>
          <OrderProductPie data={data?.productRatio} />
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <OrderDailyChart />
      </Row>
      <Row gutter={16} className="mb-4">
        <OrderMonthlyChart />
      </Row>
    </div>
  )
}
