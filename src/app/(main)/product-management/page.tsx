import { Tabs, TabsProps } from 'antd'
import React from 'react'
import ProductTab from './(product)/product-tab';
import CategoryTab from './(category)/category-tab';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Products',
    children: <ProductTab />,
  },
  {
    key: '2',
    label: 'Categories',
    children: <CategoryTab />,
  },
];

export default function OrderManagement() {
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  )
}
