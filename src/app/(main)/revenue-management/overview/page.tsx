'use client'
import PaymentDailyChart from '@/components/charts/PaymentDailyChart'
import PaymentMonthlyChart from '@/components/charts/PaymentMonthlyChart'
import PaymentStatusPie from '@/components/charts/PaymentStatusPie'
import HighestValuePayment from '@/components/revenue-management/HighestValuePayment'
import BaseBox from '@/components/statistics/BaseBox'
import { useGetPaymentOverview } from '@/services/payment.service'
import { Col, Row } from 'antd'
import React from 'react'

export default function Overview() {
  const { data } = useGetPaymentOverview()

  return (
    <div>
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <BaseBox
            showCompare
            title="Total value"
            showCurrency
            number={data?.today?.totalValue || 0}
            compareTo={data?.yesterday?.totalValue || 0}
          ></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox
            showCompare
            title="Average value"
            showCurrency
            number={data?.today?.avgValue || 0}
            compareTo={data?.yesterday?.avgValue || 0}
          ></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox
            showCompare
            title="Total VAT"
            showCurrency
            number={data?.today?.totalVat || 0}
            compareTo={data?.yesterday?.totalVat || 0}
          ></BaseBox>
        </Col>
        <Col span={6}>
          <BaseBox
            showCompare
            title="Total discount"
            showCurrency
            number={data?.today?.totalDiscount || 0}
            compareTo={data?.yesterday?.totalDiscount || 0}
          ></BaseBox>
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <PaymentStatusPie statuses={data?.statuses} />
        </Col>
        <Col span={16}>
          <HighestValuePayment payments={data?.topPayments} />
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <PaymentDailyChart />
      </Row>
      <Row gutter={16} className="mb-4">
        <PaymentMonthlyChart />
      </Row>
    </div>
  )
}
