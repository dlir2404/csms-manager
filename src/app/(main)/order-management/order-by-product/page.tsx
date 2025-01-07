import OrderByProductLineChart from '@/components/charts/OrderByProductLineChart'
import QuantityByProductLineChart from '@/components/charts/QuantityByProductLineChart'
import React from 'react'

export default function OrderByUser() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex-1">
        <OrderByProductLineChart />
      </div>
      <div className="flex-1">
        <QuantityByProductLineChart />
      </div>
    </div>
  )
}
