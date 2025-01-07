'use client'
import OrderCreatedByColumn from '@/components/charts/OrderCreatedByColumn'
import OrderDailyChart from '@/components/charts/OrderDailyChart'
import OrderMonthlyChart from '@/components/charts/OrderMonthlyChart'
import OrderProcessedByColumn from '@/components/charts/OrderProcessedByColumn'
import OrderProductPie from '@/components/charts/OrderProductPie'
import OrderStatusPie from '@/components/charts/OrderStatusPie'
import BaseBox from '@/components/statistics/BaseBox'
import { useGetOrderOverview } from '@/services/order.service'
import { Col, Row } from 'antd'
import React from 'react'

export default function Overview() {
  const { data } = useGetOrderOverview();

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
