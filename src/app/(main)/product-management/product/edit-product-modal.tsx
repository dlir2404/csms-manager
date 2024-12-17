import { useGetListCategory } from '@/services/category.service';
import { useEditProduct } from '@/services/product.service';
import { QueryKey } from '@/shared/constants/query.key';
import { ICategory } from '@/shared/types/category';
import { IProduct } from '@/shared/types/product';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Input, InputNumber, Modal, Select, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';

export default function EditProductModal({
  isOpen,
  setIsOpen,
  product,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: categories } = useGetListCategory({});
  const [form] = useForm();

  const queryClient = useQueryClient();

  const editProduct = useEditProduct(
    () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_PRODUCTS] });
      setIsLoading(false);
      setIsOpen(false);
      form.resetFields();
    },
    () => {
      setIsLoading(false);
    }
  );

  const onFinish = (values: any) => {
    if (!values.categoryIds) {
      values.categoryIds = [];
    }

    setIsLoading(true);
    editProduct.mutate({ ...values, id: product?.id });
  };

  const handleOK = () => {
    form.submit();
  };

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: +product.price,
        thumbnail: product.thumbnail,
        available: !!product.available,
        categoryIds: product.categories.map((item) => item.id),
      });
    }
  }, [product, form]);

  return (
    <Modal
      title="Edit product"
      open={isOpen}
      onOk={handleOK}
      onCancel={() => setIsOpen(false)}
      confirmLoading={isLoading}
    >
      <Form
        name="edit-product"
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
          label="Thumbnails"
          name="thumbnail"
          rules={[{ required: true, message: 'Thumbnails name is required!' }]}
        >
          <Input className="text-2xl md:text-sm" />
        </Form.Item>

        <Form.Item label="Categories" name="categoryIds">
          <Select
            mode="multiple"
            options={
              categories?.rows?.map((item: ICategory) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              }) || []
            }
            className="text-2xl md:text-sm"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
