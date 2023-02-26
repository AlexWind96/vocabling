import { nanoid } from '@reduxjs/toolkit'
import { useMutation } from '@tanstack/react-query'
import { API, CreateModuleDTO, Module, QUERY_KEY } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

export const createModule = async (body: CreateModuleDTO): Promise<Module> => {
  const { data } = await API.endpoints.module.createModule(body)
  return data
}

type Options = {
  config?: MutationConfig<typeof createModule>
}

export const useCreateModule = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (newModule) => {
      await queryClient.cancelQueries([QUERY_KEY.MODULES])

      const previousItems = queryClient.getQueryData<Module[]>([QUERY_KEY.MODULES])

      queryClient.setQueryData(
        [QUERY_KEY.MODULES],
        [
          ...(previousItems || []),
          {
            ...newModule,
            id: nanoid(10),
            _count: {
              cards: 0,
            },
          },
        ]
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
    },
    ...config,
    mutationFn: createModule,
  })
}
