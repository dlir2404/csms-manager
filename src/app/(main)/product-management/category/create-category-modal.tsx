import { useCreateCategory } from '@/services/category.service'
import { QueryKey } from '@/shared/constants/query.key'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useState } from 'react'

export default function CreateCategoryModal({
  isOpen,
  setIsOpen,
  onOK,
}: {
  isOpen: boolean
  onOK: () => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = useForm()

  // const { data: categories } = useGetListCategory({})

  const createCategory = useCreateCategory(() => {
    queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CATEGORIES] })
    setIsLoading(false)
    setIsOpen(false)
    form.resetFields()
    onOK()
  })

  const queryClient = useQueryClient()
  const onFinish = (values: any) => {
    createCategory.mutate(values)
  }

  const handleOK = () => {
    setIsLoading(true)
    form.submit()
  }

  return (
    <Modal
      title="Add new category"
      open={isOpen}
      onOk={handleOK}
      onCancel={() => setIsOpen(false)}
      confirmLoading={isLoading}
    >
      <Form
        name="create-category"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Category name"
          name="name"
          rules={[{ required: true, message: 'Category name is required!' }]}
        >
          <Input className="text-2xl md:text-sm" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
