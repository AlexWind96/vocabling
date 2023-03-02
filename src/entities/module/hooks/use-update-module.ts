import { useMutation } from '@tanstack/react-query'
import { API, Module, QUERY_KEY, UpdateModuleDTO } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

type UpdateModulePayload = {
  id: string
  body: UpdateModuleDTO
}

export const updateModule = async ({ id, body }: UpdateModulePayload): Promise<Module> => {
  const { data } = await API.endpoints.module.updateModule(id, body)
  return data
}

type Options = {
  config?: MutationConfig<typeof updateModule>
}

export const useUpdateModule = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async ({ id, body }) => {
      await queryClient.cancelQueries([QUERY_KEY.MODULES])

      const previousItem = queryClient.getQueryData<Module>([QUERY_KEY.MODULES, id])

      queryClient.setQueryData([QUERY_KEY.MODULES, id], {
        ...previousItem,
        ...body,
      })

      return { previousItem }
    },
    onError: (_, { id }, context: any) => {
      if (context?.previousItem) {
        queryClient.setQueryData([QUERY_KEY.MODULES, id], context.previousItems)
      }
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries([QUERY_KEY.MODULES, id])
      queryClient.invalidateQueries([QUERY_KEY.MODULES])
      queryClient.invalidateQueries([QUERY_KEY.FOLDERS])
    },
    ...config,
    mutationFn: updateModule,
  })
}
