import { useEditUser } from '@/services/user.service'
import { QueryKey } from '@/shared/constants/query.key'
import { IUser, UserRole } from '@/shared/types/user'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, Modal, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'

export default function EditUserModal({
    isOpen,
    setIsOpen,
    user
}: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: IUser | undefined
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = useForm()

    const queryClient = useQueryClient()

    const editUser = useEditUser(() => {
        queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
        setIsLoading(false)
        setIsOpen(false)
        form.resetFields()
    })

    const onFinish = (values: any) => {
        editUser.mutate({...values, id: user?.id})
    }

    const handleOK = () => {
        form.submit()
    }

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                username: user.username,
                fullName: user.fullName,
                role: user.role,
            });
        }
    }, [user, form]);

    return (
        <Modal
            title="Edit user"
            open={isOpen}
            onOk={handleOK}
            onCancel={() => setIsOpen(false)}
            loading={isLoading}
        >
            <Form
                name="edit-user"
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
                        options={[
                            { label: 'Manager', value: UserRole.MANAGER },
                            { label: 'Order Taker', value: UserRole.ORDER_TAKER },
                            { label: 'Barista', value: UserRole.BARISTA },
                        ]}
                        className='text-2xl md:text-sm'
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
