import { httpClient } from "@/libs/api.client"
import { ApiEndpoint } from "@/shared/constants/api.endpoint"
import { QueryKey } from "@/shared/constants/query.key"
import { useBaseMutation } from "@/shared/hooks/mutation"
import { QueryClient, useQuery } from "@tanstack/react-query"

export const useLogin = (onOk?: Function) => {
    return useBaseMutation({
        mutationFn: async (body: any) => await httpClient.post(ApiEndpoint.LOGIN, body),
        onSuccess: (data: any) => {
            const accessToken = data.token
            
            localStorage.setItem('act', accessToken)
            httpClient.setToken(accessToken)

            onOk && onOk()
        }
    })
}

export const useGetMe = (queryClient: QueryClient) => {
    return useQuery({
        queryKey: [QueryKey.GET_ME],
        queryFn: async () => {
            if (!httpClient.accessToken) {
                const accessToken = localStorage.getItem('act')
                if (!accessToken) {
                console.log('return som')
                }
                if (!accessToken)   return null;

                httpClient.setToken(accessToken);
            }

            const result = await httpClient.get('/auth/me');
            console.log('return muon')

            return result
        },
        staleTime: 0,
    }, queryClient)
}