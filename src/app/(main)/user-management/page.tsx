'use client'
import { useGetListUser } from '@/services/user.service';
import { IUser, UserRole } from '@/shared/types/user';
import { formatDate } from '@/shared/utils/format.date';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Table, TableProps, Tag } from 'antd';
import React, { useState } from 'react'
import CreateUserModal from './create-user-modal';
import EditUserModal from './edit-user-modal';

export default function UserManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [choosenUser, setChoosenUser] = useState<IUser | undefined>()

    const { data, isLoading } = useGetListUser({
        page: currentPage,
        pageSize: 10
    })

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (value) => {
                if (value === UserRole.MANAGER) return <Tag color="blue">Manager</Tag>
                if (value === UserRole.BARISTA) return <Tag color="green">Barista</Tag>
                if (value === UserRole.ORDER_TAKER) return <Tag color="volcano">Order Taker</Tag>

                return '';
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value) => <p>{formatDate(value)}</p>
        },
        {
            title: 'Last updated at',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (value) => <p>{formatDate(value)}</p>
        },
        {
            title: <SettingOutlined />,
            key: 'action',
            render: (_, record) => {
                return (
                    <div className='flex gap-4'>
                        <Button 
                        variant='outlined'
                        onClick={() => {
                            setChoosenUser(record)
                            setEditModal(true)
                        }}
                        >Edit</Button>
                        <Button danger>Delete</Button>
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <Button className='mb-4' type="primary" onClick={() => setCreateModal(true)}>Create User</Button>
            <div>

            </div>
            <Table
                bordered
                loading={isLoading}
                columns={columns}
                scroll={{ x: 'max-content' }}
                dataSource={data?.rows.map((item: any, index: number) => {
                    return {
                        key: index,
                        ...item
                    }
                })}
                pagination={{
                    pageSize: 10,
                    total: data?.count,
                    showQuickJumper: true
                }}
                onChange={(pagination) => {
                    setCurrentPage(pagination.current || 1);
                }}
            />
            <CreateUserModal isOpen={createModal} setIsOpen={setCreateModal} />
            <EditUserModal isOpen={editModal} setIsOpen={setEditModal} user={choosenUser}/>
        </>
    )
}
