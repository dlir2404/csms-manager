'use client';
import OrderCreatedByColumn from '@/components/charts/OrderCreatedByColumn';
import OrderDailyChart from '@/components/charts/OrderDailyChart';
import OrderMonthlyChart from '@/components/charts/OrderMonthlyChart';
import OrderProcessedByColumn from '@/components/charts/OrderProcessedByColumn';
import OrderProductPie from '@/components/charts/OrderProductPie';
import OrderStatusPie from '@/components/charts/OrderStatusPie';
import BaseBox from '@/components/statistics/BaseBox';
import { useGetOrderOverview } from '@/services/order.service';
import { Col, Row } from 'antd';
import React from 'react';

export default function Overview() {
  const { data } = useGetOrderOverview();

  // if (data) {
  //   data.statuses = [
  //     {
  //       status: 'created',
  //       count: 3
  //     },
  //     {
  //       status: 'processing',
  //       count: 4
  //     },
  //     {
  //       status: 'completed',
  //       count: 5
  //     },
  //   ]
  // }

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
            number={data?.today?.totalOrderValue || 0}
            compareTo={data?.yesterday?.totalOrderValue || 0}
          ></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox
            showCompare
            title="Average order value"
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
          <OrderCreatedByColumn />
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <Col span={16}>
          <OrderProcessedByColumn />
        </Col>
        <Col span={8}>
          <OrderProductPie />
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <OrderDailyChart />
      </Row>
      <Row gutter={16} className="mb-4">
        <OrderMonthlyChart />
      </Row>
    </div>
  );
}
