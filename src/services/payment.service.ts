import { httpClient } from "@/libs/api.client";
import { ApiEndpoint } from "@/shared/constants/api.endpoint";
import { PaymentMethod, PaymentStatus } from "@/shared/constants/payment";
import { QueryKey } from "@/shared/constants/query.key";
import { TABLE_SORT } from "@/shared/constants/sort";
import { useQuery } from "@tanstack/react-query";

export const useGetListPayment = ({ page, pageSize, status, method, from, to }: { page?: number; pageSize?: number, status?: PaymentStatus, method?: PaymentMethod, from?: string, to?: string }) => {
    return useQuery({
      queryKey: [QueryKey.GET_PAYMENTS, page, pageSize, status, method, from, to],
      queryFn: async () => {
        return await httpClient.get(ApiEndpoint.GET_PAYMENTS, { page, pageSize, status, paymentMethod: method, from, to, orderBy: 'id', order: TABLE_SORT.DESC })
      },
    })
  }