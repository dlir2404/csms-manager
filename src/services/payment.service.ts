import { httpClient } from "@/libs/api.client";
import { ApiEndpoint } from "@/shared/constants/api.endpoint";
import { PaymentMethod, PaymentStatus } from "@/shared/constants/payment";
import { QueryKey } from "@/shared/constants/query.key";
import { TABLE_SORT } from "@/shared/constants/sort";
import { IPaymentOverview } from "@/shared/types/payment";
import { useQuery } from "@tanstack/react-query";

export const useGetListPayment = ({ page, pageSize, status, method, from, to }: { page?: number; pageSize?: number, status?: PaymentStatus, method?: PaymentMethod, from?: string, to?: string }) => {
  return useQuery({
    queryKey: [QueryKey.GET_PAYMENTS, page, pageSize, status, method, from, to],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_PAYMENTS, { page, pageSize, status, paymentMethod: method, from, to, orderBy: 'id', order: TABLE_SORT.DESC })
    },
  })
}

export const useGetPaymentOverview = () => {
  return useQuery({
    queryKey: [QueryKey.GET_PAYMENTS_OVERVIEW],
    queryFn: async (): Promise<IPaymentOverview> => {
      return await httpClient.get(ApiEndpoint.GET_PAYMENTS_OVERVIEW)
    },
  })
}

export const useGetPaymentDailyStatistic = ({ month, year }: { month?: number; year?: number }) => {
  return useQuery({
    queryKey: [QueryKey.GET_PAYMENTS_DAILY_STATISTIC, month, year],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_PAYMENTS_DAILY_STATISTIC, {
        month,
        year,
      })
    },
  })
}

export const useGetPaymentMonthlyStatistic = ({ year }: { year?: number }) => {
  return useQuery({
    queryKey: [QueryKey.GET_PAYMENTS_MONTHLY_STATISTIC, year],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_PAYMENTS_MONTHLY_STATISTIC, {
        year,
      })
    },
  })
}