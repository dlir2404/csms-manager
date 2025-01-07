'use client'
import { useGetListPayment } from '@/services/payment.service'
import { PaymentMethod, PaymentStatus } from '@/shared/constants/payment'
import { IPayment } from '@/shared/types/payment'
import { formatDate } from '@/shared/utils/format.date'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import { EyeOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, DatePicker, Select, Table, TableProps, Tag } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
const { RangePicker } = DatePicker;

export default function AllPayment() {
  const [currentPage, setCurrentPage] = useState(1)
  const [status, setStatus] = useState<PaymentStatus | undefined>()
  const [method, setMethod] = useState<PaymentMethod | undefined>()
  const [from, setFrom] = useState<string | undefined>()
  const [to, setTo] = useState<string | undefined>()
  const { data, isLoading } = useGetListPayment({
    page: currentPage,
    pageSize: 10,
    status,
    method,
    from,
    to
  })

  const router = useRouter()

  const columns: TableProps<IPayment>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (value) => <p>{formatCurrency(value)} VND</p>,
    },
    {
      title: 'VAT',
      dataIndex: 'vat',
      key: 'vat',
      render: (value) => <p>{formatCurrency(value)} VND</p>,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (value) => <p>{formatCurrency(value)} VND</p>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value) => <p>{formatCurrency(value)} VND</p>,
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (value) => {
        if (value === PaymentMethod.CASH) return <Tag color="green">CASH</Tag>
        if (value === PaymentMethod.VNPAY) return <Tag color="blue">VNPay</Tag>

        return ''
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        if (value === PaymentStatus.PENDING) return <Tag color="gold">Pending</Tag>
        if (value === PaymentStatus.FAILED) return <Tag color="red">Failed</Tag>
        if (value === PaymentStatus.COMPLETED) return <Tag color="green">Completed</Tag>

        return ''
      },
    },
    {
      title: 'Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value) => <p>{formatDate(value)}</p>,
    },
    {
      title: <SettingOutlined />,
      dataIndex: 'updatedAt',
      key: 'action',
      render: (_, record) => {
        return <Button onClick={() => router.push(`/order-management/order/${record.orderId}`)} type="primary" icon={<EyeOutlined />}>
          View order
        </Button>
      },
    },
  ]

  const onStatusChange = (value: PaymentStatus) => {
    setStatus(value)
  }

  const onMethodChange = (value: PaymentMethod) => {
    setMethod(value)
  }

  return (
    <div>
      <div className='flex gap-4 mb-4'>
        <Select
          placeholder="Status"
          allowClear
          style={{ width: 200 }}
          onChange={onStatusChange}
          options={Object.entries(PaymentStatus).map(([key, value]) => {
            return {
              label: key,
              value: value
            }
          })}
        />
        <Select
          placeholder="Payment method"
          allowClear
          style={{ width: 200 }}
          onChange={onMethodChange}
          options={Object.entries(PaymentMethod).map(([key, value]) => {
            return {
              label: key,
              value: value
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
          setCurrentPage(pagination.current || 1)
        }}
      />
    </div>
  )
}
