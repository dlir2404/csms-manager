import { useGetListCategory } from '@/services/category.service'
import { useCreateProduct } from '@/services/product.service'
import { QueryKey } from '@/shared/constants/query.key'
import { ICategory } from '@/shared/types/category'
import { UserRole } from '@/shared/types/user'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, InputNumber, Modal, Select, Switch } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useState } from 'react'

export default function CreateProductModal({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = useForm()

    const { data: categories } = useGetListCategory({})

    const createUser = useCreateProduct(() => {
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_PRODUCTS] })
        setIsLoading(false)
        setIsOpen(false)
        form.resetFields()
    }, () => {
        setIsLoading(false)
    })

    const queryClient = useQueryClient();
    const onFinish = (values: any) => {
        setIsLoading(true)
        createUser.mutate(values)
    }

    const handleOK = () => {
        form.submit()
    }

    return (
        <Modal title="Add new product"
            open={isOpen}
            onOk={handleOK}
            onCancel={() => setIsOpen(false)}
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
                    <Input className='text-2xl md:text-sm' />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Price is required!' }]}
                >
                    <InputNumber className='text-2xl md:text-sm' />
                </Form.Item>

                <Form.Item initialValue={true} label="Available" name='available'>
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="Thumbnails"
                    name="thumbnail"
                    rules={[{ required: true, message: 'Thumbnails name is required!' }]}
                >
                    <Input className='text-2xl md:text-sm' />
                </Form.Item>

                <Form.Item
                    label="Categories"
                    name="categoryIds"
                >
                    <Select
                        mode='multiple'
                        value={UserRole.ORDER_TAKER}
                        options={categories?.rows?.map((item: ICategory) => {
                            return {
                                label: item.name,
                                value: item.id
                            }
                        }) || []}
                        className='text-2xl md:text-sm'
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
