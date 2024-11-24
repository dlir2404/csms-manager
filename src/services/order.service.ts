import { httpClient } from "@/libs/api.client"
import { ApiEndpoint } from "@/shared/constants/api.endpoint"
import { QueryKey } from "@/shared/constants/query.key"
import { useQuery } from "@tanstack/react-query"

export const useGetListOrder = ({
    page,
    pageSize
}: {
    page?: number,
    pageSize?: number
}) => {
    return useQuery({
        queryKey: [QueryKey.GET_ORDERS],
        queryFn: async () => {
            return await httpClient.get(ApiEndpoint.GET_ORDERS)
        }
    })
}

export const useGetOrderDailyStatistic = ({
    month,
    year
}: {
    month?: number,
    year?: number
}) => {
    return useQuery({
        queryKey: [QueryKey.GET_ORDERS_DAILY_STATISTIC, month, year],
        queryFn: async () => {
            return await httpClient.get(ApiEndpoint.GET_ORDERS_DAILY_STATISTIC, {month, year})
        }
    })
}

export const useGetOrderMonthlyStatistic = ({
    year
}: {
    year?: number
}) => {
    return useQuery({
        queryKey: [QueryKey.GET_ORDERS_MONTHLY_STATISTIC, year],
        queryFn: async () => {
            return await httpClient.get(ApiEndpoint.GET_ORDERS_MONTHLY_STATISTIC, {year})
        }
    })
}