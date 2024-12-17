import OrderDailyChart from '@/components/charts/OrderDailyChart';
import OrderMonthlyChart from '@/components/charts/OrderMonthlyChart';
import React from 'react';

export default function Overview() {
  return (
    <div className="gap-10">
      <div className="">
        <OrderDailyChart />
      </div>
      <div className="">
        <OrderMonthlyChart />
      </div>
    </div>
  );
}
