'use client'
import { useGetListOrder } from '@/services/order.service'
import { useGetListUser } from '@/services/user.service'
import { IOder, OrderStatus } from '@/shared/types/order'
import { IProduct } from '@/shared/types/product'
import { UserRole } from '@/shared/types/user'
import { formatDate } from '@/shared/utils/format.date'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import { DatePicker, Select, Table, TableProps, Tag } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
const { RangePicker } = DatePicker;

export default function OrderManagement() {
  const [currentPage, setCurrentPage] = useState(1)
  const [status, setStatus] = useState<OrderStatus | undefined>()
  const [createdBy, setCreatedBy] = useState<number | undefined>()
  const [processBy, setProcessBy] = useState<number | undefined>()
  const [from, setFrom] = useState<string | undefined>()
  const [to, setTo] = useState<string | undefined>()
  const router = useRouter()
  const { data, isLoading } = useGetListOrder({
    page: currentPage,
    pageSize: 10,
    status,
    createdBy,
    processBy,
    from,
    to
  })

  const { data: orderTakers, isLoading: orderTakerLoading } = useGetListUser({
    page: 1,
    pageSize: 1000,
    role: UserRole.ORDER_TAKER
  })

  const { data: baristas, isLoading: baristaLoading } = useGetListUser({
    page: 1,
    pageSize: 1000,
    role: UserRole.BARISTA
  })

  const columns: TableProps<IOder>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value) => <p>{formatCurrency(value)} VND</p>,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        if (value === OrderStatus.CREATED) return <Tag color="gold">Waiting for processing</Tag>
        if (value === OrderStatus.PROCESSING) return <Tag color="blue">Processing</Tag>
        if (value === OrderStatus.COMPLETED) return <Tag color="green">Completed</Tag>
        if (value === OrderStatus.CANCELED) return <Tag color="red">Canceled</Tag>

        return ''
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'products',
      key: 'products',
      render: (value: IProduct[]) => {
        let quantity = 0

        value.forEach((product) => (quantity += product.quantity || 0))
        return <p>{quantity}</p>
      },
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (value) => value?.fullName || value?.username,
    },
    {
      title: 'Processed by',
      dataIndex: 'processBy',
      key: 'processBy',
      render: (value) => value?.fullName || value?.username,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => <p>{formatDate(value)}</p>,
    },
    // {
    //   title: <SettingOutlined />,
    //   key: 'action',
    //   render: (_, record) => {
    //     return (
    //       <div className='flex gap-4'>

    //       </div>
    //     )
    //   }
    // }
  ]

  const onStatusChange = (value: OrderStatus) => {
    setStatus(value)
  }

  const onCreatedByChange = (value: number) => {
    setCreatedBy(value)
  }

  const onProcessByChange = (value: number) => {
    setProcessBy(value)
  }

  return (
    <div>
      <div className='flex gap-4 mb-4'>
        <Select
          placeholder="Status"
          allowClear
          style={{ width: 200 }}
          onChange={onStatusChange}
          options={Object.entries(OrderStatus).map(([key, value]) => {
            return {
              label: key,
              value: value
            }
          })}
        />
        <Select
          placeholder="Created by"
          allowClear
          loading={orderTakerLoading}
          style={{ width: 200 }}
          onChange={onCreatedByChange}
          options={orderTakers?.rows?.map((e: any) => {
            return {
              label: e.fullName || e.username,
              value: e.id
            }
          })}
        />
        <Select
          placeholder="Proccessed by"
          allowClear
          loading={baristaLoading}
          style={{ width: 200 }}
          onChange={onProcessByChange}
          options={baristas?.rows?.map((e: any) => {
            return {
              label: e.fullName || e.username,
              value: e.id
            }
          })}
        />
        <RangePicker onChange={(e) => {
          if (e) {
            setFrom(e[0]?.toISOString())
            setTo(e[1]?.toISOString())
          }
        }} />
      </div>
      <Table
        className='cursor-pointer'
        bordered
        loading={isLoading}
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={data?.rows.map((item: any, index: number) => {
          return {
            key: index,
            ...item,
          }
        })}
        pagination={{
          pageSize: 10,
          total: data?.count,
        }}
        onChange={(pagination) => {
          console.log(pagination)
          setCurrentPage(pagination.current || 1)
        }}
        onRow={(record) => ({
          onClick: () => {
            router.push(`/order-management/order/${record.id}`)
          }
        })}
      />
    </div>
  )
}
