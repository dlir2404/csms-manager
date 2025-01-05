import { Empty } from 'antd'
import React from 'react'

export default function BaseEmpty() {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center text-8xl">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  )
}
