'use client'
import OrderCreatedByLineChart from '@/components/charts/OrderCreatedByLineChart'
import OrderProcessedByLineChart from '@/components/charts/OrderProcessedByLineChart'
import React from 'react'

export default function OrderByUser() {
  return (
    <div className="">
      <OrderCreatedByLineChart />
      <OrderProcessedByLineChart />
    </div>
  )
}
