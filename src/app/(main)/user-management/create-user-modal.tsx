import { useCreateUser } from '@/services/user.service'
import { QueryKey } from '@/shared/constants/query.key'
import { UserRole } from '@/shared/types/user'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, Modal, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useState } from 'react'

export default function CreateUserModal({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = useForm()

    const createUser = useCreateUser(() => {
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS]})
        setIsLoading(false)
        setIsOpen(false)
        form.resetFields()
    })

    const queryClient = useQueryClient();
    const onFinish = (values: any) => {
        createUser.mutate(values)
    }

    const handleOK = () => {
        form.submit()
    }

    return (
        <Modal title="Create new user"
            open={isOpen}
            onOk={handleOK}
            onCancel={() => setIsOpen(false)}
            loading={isLoading}
        >
            <Form
                name="create-user"
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Username is required!' }]}
                >
                    <Input className='text-2xl md:text-sm' />
                </Form.Item>

                <Form.Item
                    label="Full name"
                    name="fullName"
                    rules={[{ required: true, message: 'Fullname is required!' }]}
                >
                    <Input className='text-2xl md:text-sm' />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Role is required!' }]}
                >
                    <Select
                        value={UserRole.ORDER_TAKER}
                        options={[
                            {
                                label: 'Manager',
                                value: UserRole.MANAGER
                            },
                            {
                                label: 'Order Taker',
                                value: UserRole.ORDER_TAKER
                            },
                            {
                                label: 'Barista',
                                value: UserRole.BARISTA
                            }
                        ]}
                        className='text-2xl md:text-sm'
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Password is reuired!' }]}
                >
                    <Input.Password className='text-2xl md:text-sm' />
                </Form.Item>
            </Form>
        </Modal>
    )
}
