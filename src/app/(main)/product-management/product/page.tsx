'use client'
import { useGetListProduct } from '@/services/product.service'
import { IProduct } from '@/shared/types/product'
import { SettingOutlined } from '@ant-design/icons'
import { Button, Table, TableProps, Tag, Image, Select } from 'antd'
import React, { useState } from 'react'
import CreateProductModal from './create-product-modal'
import EditProductModal from './edit-product-modal'
import DeleteProductModal from './delete-product-modal'
import { ICategory } from '@/shared/types/category'
import Search from 'antd/es/input/Search'
import { useGetListCategory } from '@/services/category.service'

export default function ProductTab() {
  const [currentPage, setCurrentPage] = useState(1)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [choosenProduct, setChoosenProduct] = useState<IProduct | undefined>()
  const [search, setSearch] = useState()
  const [available, setAvailable] = useState<boolean | undefined>()
  const [category, setCategory] = useState<number | undefined>()

  const { data, isLoading } = useGetListProduct({
    page: currentPage,
    pageSize: 10,
    search: search ? search : '',
    available,
    category,
  })
  const { data: categories } = useGetListCategory({})

  const columns: TableProps<IProduct>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (value) => <Image width={100} src={value} alt={'Thumbnail'} />,
    },
    {
      title: 'Status',
      dataIndex: 'available',
      key: 'available',
      render: (value) => {
        if (value) {
          return <Tag color="green">Available</Tag>
        }
        return <Tag color="red">Unavailable</Tag>
      },
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      render: (values) => {
        return (
          <>
            {values.map((value: ICategory) => {
              return <Tag key={value.id}>{value.name}</Tag>
            })}
          </>
        )
      },
    },
    {
      title: <SettingOutlined />,
      key: 'action',
      render: (_, record) => {
        return (
          <div className="flex gap-4">
            <Button
              variant="outlined"
              onClick={() => {
                setChoosenProduct(record)
                setEditModal(true)
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                setChoosenProduct(record)
                setDeleteModal(true)
              }}
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  const onCategoryChange = (value: number | undefined) => {
    setCategory(value)
  }

  const onStatusChange = (value: boolean | undefined) => {
    setAvailable(value)
  }

  const onSearch = (data: any) => {
    setSearch(data)
  }

  return (
    <>
      <div className="flex justify-between">
        <Button className="mb-4" type="primary" onClick={() => setCreateModal(true)}>
          Add Product
        </Button>
        <div className="flex gap-4">
          <Select
            placeholder="Category"
            allowClear
            style={{ width: 200 }}
            onChange={onCategoryChange}
            options={categories?.rows?.map((category: any) => {
              return {
                label: category.name,
                value: category.id,
              }
            })}
          />
          <Select
            allowClear
            placeholder="Status"
            style={{ width: 120 }}
            onChange={onStatusChange}
            options={[
              {
                label: 'Available',
                value: true,
              },
              {
                label: 'Unavailable',
                value: false,
              },
            ]}
          />
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 400 }}
            loading={isLoading}
          />
        </div>
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
      <CreateProductModal isOpen={createModal} setIsOpen={setCreateModal} />
      <EditProductModal isOpen={editModal} setIsOpen={setEditModal} product={choosenProduct} />
      <DeleteProductModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        product={choosenProduct}
      />
    </>
  )
}
