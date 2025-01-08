import { httpClient } from '@/libs/api.client'
import { ApiEndpoint } from '@/shared/constants/api.endpoint'
import { QueryKey } from '@/shared/constants/query.key'
import { useBaseMutation } from '@/shared/hooks/mutation'
import { useQuery } from '@tanstack/react-query'
import { notification } from 'antd'

export const useGetListProduct = ({
  page,
  pageSize,
  search,
  available,
  category,
}: {
  page: number
  pageSize: number
  search: string
  available?: boolean
  category?: number
}) => {
  return useQuery({
    queryKey: [QueryKey.GET_PRODUCTS, page, pageSize, search, available, category, search],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_PRODUCTS, {
        page,
        pageSize,
        search,
        available,
        category,
      })
    },
  })
}

export const useCreateProduct = (onOk?: (data: any) => void, onError?: (error: any) => void) => {
  return useBaseMutation({
    mutationFn: async (body: any) => await httpClient.post(ApiEndpoint.CREATE_PRODUCT, body),
    onSuccess: (data: any) => {
      onOk && onOk(data)
      notification.success({
        placement: 'top',
        message: 'Successfully',
      })
    },
    onError: (error: any) => {
      onError && onError(error)
      notification.error({
        placement: 'top',
        message: error.error,
        description: Array.isArray(error.message) ? error.message[0] : error.message,
      })
    },
  })
}

export const useEditProduct = (onOk?: (data: any) => void, onError?: (data: any) => void) => {
  return useBaseMutation({
    mutationFn: async (body: any) => {
      const { id, ...rest } = body

      return await httpClient.put(ApiEndpoint.EDIT_PRODUCT, rest, { id: id })
    },
    onSuccess: (data: any) => {
      onOk && onOk(data)
      notification.success({
        placement: 'top',
        message: 'Successfully',
      })
    },
    onError: (error: any) => {
      onError && onError(error)
      notification.error({
        placement: 'top',
        message: error.error,
        description: Array.isArray(error.message) ? error.message[0] : error.message,
      })
    },
  })
}

export const useDeleteProduct = (onOk?: (data: any) => void) => {
  return useBaseMutation({
    mutationFn: async (body: any) => {
      const { id } = body

      return await httpClient.delete(ApiEndpoint.DELETE_PRODUCT, { id: id })
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
