import { useDeleteProduct } from '@/services/product.service'
import { QueryKey } from '@/shared/constants/query.key'
import { IProduct } from '@/shared/types/product'
import { useQueryClient } from '@tanstack/react-query'
import { Modal } from 'antd'
import React, { useState } from 'react'

export default function DeleteProductModal({
  isOpen,
  setIsOpen,
  product,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  product: IProduct | undefined
}) {
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()

  const deleteProduct = useDeleteProduct(() => {
    queryClient.invalidateQueries({ queryKey: [QueryKey.GET_PRODUCTS] })
    setIsLoading(false)
    setIsOpen(false)
  })

  const handleOK = () => {
    setIsLoading(true)
    deleteProduct.mutate({ id: product?.id })
  }

  return (
    <Modal
      title={<span style={{ color: '#b91c1c' }}>Edit product</span>}
      open={isOpen}
      onOk={handleOK}
      onCancel={() => setIsOpen(false)}
      confirmLoading={isLoading}
    >
      <p className="text-red-700">Are you sure to delete this product ?</p>
    </Modal>
  )
}
