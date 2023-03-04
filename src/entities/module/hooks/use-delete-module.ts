import { useMutation } from '@tanstack/react-query'
import { API, Module, QUERY_KEY } from '@/shared/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

export const deleteModule = async (id: string): Promise<Module> => {
  const { data } = await API.module.deleteModule(id)
  return data
}

type Options = {
  config?: MutationConfig<typeof deleteModule>
}

export const useDeleteModule = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (id) => {
      await queryClient.cancelQueries([QUERY_KEY.MODULES])

      const previousItems = queryClient.getQueryData<Module[]>([QUERY_KEY.MODULES])

      queryClient.setQueryData(
        [QUERY_KEY.MODULES],
        previousItems?.filter((item) => item.id !== id)
      )

      return { previousItems }
    },
    onError: (_, __, context: any) => {
      if (context?.previousItems) {
        queryClient.setQueryData([QUERY_KEY.MODULES], context.previousItems)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.MODULES])
      queryClient.invalidateQueries([QUERY_KEY.FOLDERS])
    },
    ...config,
    mutationFn: deleteModule,
  })
}
