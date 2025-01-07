import OrderByProductLineChart from '@/components/charts/OrderByProductLineChart'
import React from 'react'

export default function OrderByUser() {
  return (
    <div className="flex gap-10">
      <div className="flex-1">
        <OrderByProductLineChart />
      </div>
    </div>
  )
}
