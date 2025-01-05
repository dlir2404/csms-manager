import { useDeleteCategory } from '@/services/category.service'
import { QueryKey } from '@/shared/constants/query.key'
import { ICategory } from '@/shared/types/category'
import { useQueryClient } from '@tanstack/react-query'
import { Modal } from 'antd'
import React, { useState } from 'react'

export default function DeleteCategoryModal({
  isOpen,
  setIsOpen,
  category,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  category: ICategory | undefined
}) {
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()

  const deleteProduct = useDeleteCategory(() => {
    queryClient.invalidateQueries({ queryKey: [QueryKey.GET_CATEGORIES] })
    setIsLoading(false)
    setIsOpen(false)
  })

  const handleOK = () => {
    setIsLoading(true)
    deleteProduct.mutate({ id: category?.id })
  }

  return (
    <Modal
      title={<span style={{ color: '#b91c1c' }}>Delete category</span>}
      open={isOpen}
      onOk={handleOK}
      onCancel={() => setIsOpen(false)}
      confirmLoading={isLoading}
    >
      <p className="text-red-700">Are you sure to delete this category ?</p>
    </Modal>
  )
}
