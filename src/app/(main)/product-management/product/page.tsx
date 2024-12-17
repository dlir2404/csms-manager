'use client';
import { useGetListProduct } from '@/services/product.service';
import { IProduct } from '@/shared/types/product';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Table, TableProps, Tag, Image } from 'antd';
import React, { useState } from 'react';
import CreateProductModal from './create-product-modal';
import EditProductModal from './edit-product-modal';
import DeleteProductModal from './delete-product-modal';
import { ICategory } from '@/shared/types/category';

export default function ProductTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [choosenProduct, setChoosenProduct] = useState<IProduct | undefined>();

  const { data, isLoading } = useGetListProduct({
    page: currentPage,
    pageSize: 10,
  });

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
          return <Tag color="green">Available</Tag>;
        }
        return <Tag color="red">Unavailable</Tag>;
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
              return <Tag key={value.id}>{value.name}</Tag>;
            })}
          </>
        );
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
                setChoosenProduct(record);
                setEditModal(true);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                setChoosenProduct(record);
                setDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Button
        className="mb-4"
        type="primary"
        onClick={() => setCreateModal(true)}
      >
        Add Product
      </Button>
      <div>{/* filter */}</div>
      <Table
        bordered
        loading={isLoading}
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={data?.rows.map((item: any, index: number) => {
          return {
            key: index,
            ...item,
          };
        })}
        pagination={{
          pageSize: 10,
          total: data?.count,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current || 1);
        }}
      />
      <CreateProductModal isOpen={createModal} setIsOpen={setCreateModal} />
      <EditProductModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        product={choosenProduct}
      />
      <DeleteProductModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        product={choosenProduct}
      />
    </>
  );
}
