import { useMutation } from '@tanstack/react-query'
import { API, Folder, QUERY_KEY } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

export const deleteFolder = async (id: string): Promise<Folder> => {
  const { data } = await API.endpoints.folder.deleteFolder(id)
  return data
}

type Options = {
  config?: MutationConfig<typeof deleteFolder>
}

export const useDeleteFolder = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (id) => {
      await queryClient.cancelQueries([QUERY_KEY.FOLDERS])

      const previousItems = queryClient.getQueryData<Folder[]>([QUERY_KEY.FOLDERS])

      queryClient.setQueryData(
        [QUERY_KEY.FOLDERS],
        previousItems?.filter((item) => item.id !== id)
      )

      return { previousItems }
    },
    onError: (_, __, context: any) => {
      if (context?.previousItems) {
        queryClient.setQueryData([QUERY_KEY.FOLDERS], context.previousItems)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.FOLDERS])
      queryClient.invalidateQueries([QUERY_KEY.MODULES])
    },
    ...config,
    mutationFn: deleteFolder,
  })
}
