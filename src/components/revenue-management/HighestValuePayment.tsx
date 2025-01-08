import { PaymentMethod, PaymentStatus } from '@/shared/constants/payment'
import { IPayment } from '@/shared/types/payment'
import { formatDate } from '@/shared/utils/format.date'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import { EyeOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Table, TableProps, Tag } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HighestValuePayment({ payments }: { payments?: IPayment[] }) {
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
      fixed: 'right',
      render: (_, record) => {
        return (
          <Button
            onClick={() => router.push(`/order-management/order/${record.orderId}`)}
            type="primary"
            icon={<EyeOutlined />}
          >
            View order
          </Button>
        )
      },
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm h-[500px]">
      <div className="flex p-4 justify-between items-center">
        <div className="font-semibold text-lg">Top 5 highest value payments</div>
      </div>
      <Table
        bordered
        loading={!payments}
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={payments?.map((item: any, index: number) => {
          return {
            key: index,
            ...item,
          }
        })}
        pagination={false}
      />
    </div>
  )
}
