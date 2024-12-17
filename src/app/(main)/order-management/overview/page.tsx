import OrderCreatedByColumn from '@/components/charts/OrderCreatedByColumn';
import OrderDailyChart from '@/components/charts/OrderDailyChart';
import OrderMonthlyChart from '@/components/charts/OrderMonthlyChart';
import OrderProcessedByColumn from '@/components/charts/OrderProcessedByColumn';
import OrderProductPie from '@/components/charts/OrderProductPie';
import OrderStatusPie from '@/components/charts/OrderStatusPie';
import BaseBox from '@/components/statistics/BaseBox';
import { Col, Row } from 'antd';
import React from 'react';

export default function Overview() {
  return (
    <div>
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <BaseBox title="Total order" number={100} compareTo={87}></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox
            title="Total order value"
            number={100}
            compareTo={112}
          ></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox title="Average order value" number={100}></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox title="Average item per order" number={100}></BaseBox>
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <OrderStatusPie />
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
