import { httpClient } from '@/libs/api.client';
import { ApiEndpoint } from '@/shared/constants/api.endpoint';
import { QueryKey } from '@/shared/constants/query.key';
import { IOrderOverview } from '@/shared/types/order';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderOverview = () => {
  return useQuery({
    queryKey: [QueryKey.GET_ORDERS_OVERVIEW],
    queryFn: async (): Promise<IOrderOverview> => {
      return await httpClient.get(ApiEndpoint.GET_ORDERS_OVERVIEW);
    },
  });
};

export const useGetListOrder = ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: [QueryKey.GET_ORDERS, page, pageSize],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_ORDERS);
    },
  });
};

export const useGetOrderDailyStatistic = ({
  month,
  year,
}: {
  month?: number;
  year?: number;
}) => {
  return useQuery({
    queryKey: [QueryKey.GET_ORDERS_DAILY_STATISTIC, month, year],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_ORDERS_DAILY_STATISTIC, {
        month,
        year,
      });
    },
  });
};

export const useGetOrderMonthlyStatistic = ({ year }: { year?: number }) => {
  return useQuery({
    queryKey: [QueryKey.GET_ORDERS_MONTHLY_STATISTIC, year],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_ORDERS_MONTHLY_STATISTIC, {
        year,
      });
    },
  });
};

export const useGetOrderCreatedByStatistic = ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  return useQuery({
    queryKey: [QueryKey.GET_ORDERS_CREATED_BY_STATISTIC, from, to],
    queryFn: async () => {
      return await httpClient.get(ApiEndpoint.GET_ORDERS_CREATED_BY_STATISTIC, {
        from,
        to,
      });
    },
  });
};

export const useGetOrderProcessedByStatistic = ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  return useQuery({
    queryKey: [QueryKey.GET_ORDERS_PROCESSED_BY_STATISTIC, from, to],
    queryFn: async () => {
      return await httpClient.get(
        ApiEndpoint.GET_ORDERS_PROCESSED_BY_STATISTIC,
        { from, to }
      );
    },
  });
};
