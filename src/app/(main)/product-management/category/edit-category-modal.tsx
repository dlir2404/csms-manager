import { useEditCategory } from '@/services/category.service';
import { QueryKey } from '@/shared/constants/query.key';
import { ICategory } from '@/shared/types/category';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';

export default function EditCategoryModal({
  isOpen,
  setIsOpen,
  category,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: ICategory | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();

  const queryClient = useQueryClient();

  const editCategory = useEditCategory(() => {
    queryClient.invalidateQueries({ queryKey: [QueryKey.GET_PRODUCTS] });
    setIsLoading(false);
    setIsOpen(false);
    form.resetFields();
  });

  const onFinish = (values: any) => {
    setIsLoading(true);
    editCategory.mutate({ ...values, id: category?.id });
  };

  const handleOK = () => {
    form.submit();
  };

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
      });
    }
  }, [category, form]);

  return (
    <Modal
      title="Edit category"
      open={isOpen}
      onOk={handleOK}
      onCancel={() => setIsOpen(false)}
      confirmLoading={isLoading}
    >
      <Form
        name="edit-category"
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
  );
}
