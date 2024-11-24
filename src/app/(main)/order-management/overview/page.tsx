import OrderDailyChart from '@/components/charts/OrderDailyChart'
import OrderMonthlyChart from '@/components/charts/OrderMonthlyChart'
import React from 'react'

export default function Overview() {
  return (
    <div className='flex gap-10'>
      <div className='flex-1'>
        <OrderDailyChart />
      </div>
      <div className='flex-1'>
        <OrderMonthlyChart />
      </div>
    </div>
  )
}
