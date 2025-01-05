import OrderCreatedByChart from '@/components/charts/OrderCreatedByChart'
import OrderProcessedByChart from '@/components/charts/OrderProcessedByChart'
import React from 'react'

export default function OrderByUser() {
  return (
    <div className="flex gap-10">
      <div className="flex-1">
        <OrderCreatedByChart />
      </div>
      <div className="flex-1">
        <OrderProcessedByChart />
      </div>
    </div>
  )
}
