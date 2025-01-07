'use client'
import { PaymentMethod, PaymentStatus } from '@/shared/constants/payment';
import { OrderStatus } from '@/shared/types/order';
import { IProduct } from '@/shared/types/product';
import { formatDate } from '@/shared/utils/format.date';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { Button, Col, Image, Modal, Row, Table, TableProps, Tag } from 'antd';
import React from 'react'
import { useGetOrder } from '@/services/order.service';

interface OrderPageProps {
    params: {
        orderId: number;
    };
}

const showStatus = (value: string) => {
    if (value === OrderStatus.CREATED) return <Tag color="volcano">Waiting for processing</Tag>
    if (value === OrderStatus.PROCESSING) return <Tag color="blue">Processing</Tag>
    if (value === OrderStatus.COMPLETED) return <Tag color="green">Completed</Tag>
}

const showPayment = (value: string | undefined, paymentMethod?: string) => {
    if (value === PaymentStatus.COMPLETED)
        return (<>
            <div className='flex justify-between items-center'>
                <div>Payment: </div>
                <div><Tag color="green">PAID</Tag></div>
            </div>
            <div className='flex justify-between items-center'>
                <div>Payment method: </div>
                {paymentMethod === PaymentMethod.CASH && (
                    <div>CASH</div>
                )}
                {paymentMethod === PaymentMethod.VNPAY && (
                    <div>VNPay</div>
                )}
            </div>
        </>)

    return (<div className='flex justify-between items-center'>
        <div>Payment: </div>
        <div><Tag color="volcano">UNPAID</Tag></div>
    </div>)
}

export default function OrderDetail({ params }: OrderPageProps) {
    const { data, isLoading } = useGetOrder(params.orderId)

    let totalPrice = 0;
    let totalQuantity = 0;
    const products = data?.products.map((item: IProduct, index: number) => {
        totalPrice += (item.quantity || 0) * item.price
        totalQuantity += item.quantity || 0
        return {
            key: index + 1,
            ...item
        }
    })

    let dataSource
    if (products != undefined) {
        dataSource = [
            ...products,
            {
                key: 'Total',
                quantity: totalQuantity,
                price: totalPrice
            }
        ]
    }

    const columns: TableProps<any>['columns'] = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            render: (value) => {
                if (value === "Total")
                    return <p className='font-bold text-ls'>{value}</p>
                return <p>{value}</p>
            }
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (value) => {
                if (value != undefined) {
                    return <Image width={60} height={60} src={value}></Image>
                }
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => {
                if (record.key === "Total") return <p className='text-lg font-bold'>{formatCurrency(record.price)} VND</p>
                return <p>{formatCurrency((record.quantity || 0) * record.price)} VND</p>
            }
        }
    ]

    return (
        <div>
            <div className='pr-16'>
                <div className='flex gap-4'>
                    <Col span={16} className='bg-white p-4 rounded-lg'>
                        <div className='text-center text-xl font-bold mb-4'>Items</div>
                        <Table
                            bordered
                            loading={isLoading}
                            columns={columns}
                            scroll={{ x: 'max-content' }}
                            dataSource={dataSource}
                            pagination={false}
                        />
                    </Col>
                    <Col span={8} className='bg-white p-4 rounded-lg'>
                        <div className='text-center text-xl font-bold mb-4'>Detail information</div>
                        <div className='p-4 flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div>Created by: </div>
                                <div>{data?.createdBy?.fullName || data?.createdBy.username}</div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div>Barista: </div>
                                <div>{data?.processBy?.fullName || data?.processBy?.username || ''}</div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div>Created at: </div>
                                <div>{formatDate(data?.createdAt)}</div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div>Status: </div>
                                <div>{showStatus(data?.status)}</div>
                            </div>
                            {showPayment(data?.payment?.status, data?.payment?.paymentMethod)}
                            <div className='flex justify-between items-center'>
                                <div>Note: </div>
                                <div>{data?.note}</div>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        </div>
    )
}