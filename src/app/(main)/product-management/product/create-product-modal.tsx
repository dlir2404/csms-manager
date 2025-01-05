import uploadToCloudinary from '@/libs/cloudinary'
import { useGetListCategory } from '@/services/category.service'
import { useCreateProduct } from '@/services/product.service'
import { QueryKey } from '@/shared/constants/query.key'
import { ICategory } from '@/shared/types/category'
import { UserRole } from '@/shared/types/user'
import { UploadOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, InputNumber, Modal, Select, Switch, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useState } from 'react'

export default function CreateProductModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = useForm()

  const { data: categories } = useGetListCategory({})

  const createUser = useCreateProduct(
    () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_PRODUCTS] })
      setIsLoading(false)
      setIsOpen(false)
      form.resetFields()
    },
    () => {
      setIsLoading(false)
    }
  )

  const queryClient = useQueryClient()
  const onFinish = async (values: any) => {
    setIsLoading(true)
    const { thumbnail, ...rest } = values

    const result = await uploadToCloudinary(thumbnail.file)

    createUser.mutate({
      thumbnail: result,
      ...rest,
    })
  }

  const handleOK = () => {
    form.submit()
  }

  return (
    <Modal
      title="Add new product"
      open={isOpen}
      onOk={handleOK}
      onCancel={() => {
        setIsOpen(false)
        form.resetFields()
      }}
      confirmLoading={isLoading}
    >
      <Form
        name="create-product"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Product name"
          name="name"
          rules={[{ required: true, message: 'Product name is required!' }]}
        >
          <Input className="text-2xl md:text-sm" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Price is required!' }]}
        >
          <InputNumber className="text-2xl md:text-sm" />
        </Form.Item>

        <Form.Item initialValue={true} label="Available" name="available">
          <Switch />
        </Form.Item>
        <Form.Item
          name="thumbnail"
          label="Thumbnail"
          rules={[{ required: true, message: 'Please upload a thumbnail!' }]}
        >
          <Upload
            name="thumbnail"
            listType="picture"
            beforeUpload={(file) => {
              return new Promise((resolve, reject) => {
                if (file.size > 2) {
                  reject('File size excceed')
                } else {
                  resolve('success')
                }
              })
            }}
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Categories" name="categoryIds">
          <Select
            mode="multiple"
            value={UserRole.ORDER_TAKER}
            options={
              categories?.rows?.map((item: ICategory) => {
                return {
                  label: item.name,
                  value: item.id,
                }
              }) || []
            }
            className="text-2xl md:text-sm"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
