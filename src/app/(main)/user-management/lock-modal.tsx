import { useToggleLockUser } from '@/services/user.service'
import { QueryKey } from '@/shared/constants/query.key'
import { IUser } from '@/shared/types/user'
import { useQueryClient } from '@tanstack/react-query'
import { Modal } from 'antd'
import React, { useState } from 'react'

export default function LockModal({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: IUser | undefined
}) {
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()

  const toggleLockUser = useToggleLockUser(() => {
    queryClient.invalidateQueries({ queryKey: [QueryKey.GET_USERS] })
    setIsLoading(false)
    setIsOpen(false)
  })

  const handleOK = () => {
    setIsLoading(true)
    toggleLockUser.mutate({ id: user?.id })
  }

  return (
    <Modal
      title={user?.isLock ? "Unlock" : "Lock"}
      open={isOpen}
      onOk={handleOK}
      onCancel={() => setIsOpen(false)}
      confirmLoading={isLoading}
    >
      <p>{user?.isLock ? "Unlock this user?" : "Lock this user?"}</p>
    </Modal>
  )
}
