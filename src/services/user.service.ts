import { httpClient } from '@/libs/api.client'
import { ApiEndpoint } from '@/shared/constants/api.endpoint'
import { QueryKey } from '@/shared/constants/query.key'
import { useBaseMutation } from '@/shared/hooks/mutation'
import { useQuery } from '@tanstack/react-query'
import { notification } from 'antd'

export const useGetListUser = ({ page, pageSize, search }: { page: number; pageSize: number, search?: string }) => {
  return useQuery({
    queryKey: [QueryKey.GET_USERS, page, pageSize, search],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_USERS, { page, pageSize, search })
    },
  })
}

export const useCreateUser = (onOk?: (data: any) => void) => {
  return useBaseMutation({
    mutationFn: async (body: any) => await httpClient.post(ApiEndpoint.CREATE_USER, body),
    onSuccess: (data: any) => {
      onOk && onOk(data)
      notification.success({
        placement: 'top',
        message: 'Successfully',
      })
    },
  })
}

export const useEditUser = (onOk?: (data: any) => void) => {
  return useBaseMutation({
    mutationFn: async (body: any) => {
      const { id, ...rest } = body

      return await httpClient.put(ApiEndpoint.EDIT_USER, rest, { id: id })
    },
    onSuccess: (data: any) => {
      onOk && onOk(data)
      notification.success({
        placement: 'top',
        message: 'Successfully',
      })
    },
  })
}
