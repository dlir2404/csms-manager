'use client'
import { SettingOutlined } from '@ant-design/icons';
import { Button, Table, TableProps, Tag, Image } from 'antd';
import React, { useState } from 'react'
import { ICategory } from '@/shared/types/category';
import { useGetListCategory } from '@/services/category.service';
import CreateCategoryModal from './create-category-modal';
import EditCategoryModal from './edit-category-modal';
import DeleteCategoryModal from './delete-category-modal';

export default function CategoryTab() {
    const [currentPage, setCurrentPage] = useState(1);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [choosenCategory, setChoosenCategory] = useState<ICategory | undefined>()

    const { data, isLoading } = useGetListCategory({
        page: currentPage,
        pageSize: 10
    })

    const columns: TableProps<ICategory>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
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
                                setChoosenCategory(record)
                                setEditModal(true)
                            }}
                        >Edit</Button>
                        <Button danger
                            onClick={() => {
                                setChoosenCategory(record)
                                setDeleteModal(true)
                            }}
                        >Delete
                        </Button>
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <Button className='mb-4' type="primary" onClick={() => setCreateModal(true)}>Add Category</Button>
            <div>
                {/* filter */}
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
            <CreateCategoryModal isOpen={createModal} setIsOpen={setCreateModal} />
            <EditCategoryModal isOpen={editModal} setIsOpen={setEditModal} category={choosenCategory} />
            <DeleteCategoryModal isOpen={deleteModal} setIsOpen={setDeleteModal} category={choosenCategory} />
        </>
    )
}
