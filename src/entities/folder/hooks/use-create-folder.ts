import { nanoid } from '@reduxjs/toolkit'
import { useMutation } from '@tanstack/react-query'
import { API, CreateFolderDto, Folder, QUERY_KEY } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

export const createFolder = async (body: CreateFolderDto): Promise<Folder> => {
  const { data } = await API.endpoints.folder.createFolder(body)
  return data
}

type Options = {
  config?: MutationConfig<typeof createFolder>
}

export const useCreateFolder = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (newFolder) => {
      await queryClient.cancelQueries([QUERY_KEY.FOLDERS])

      const previousItems = queryClient.getQueryData<Folder[]>([QUERY_KEY.FOLDERS])

      queryClient.setQueryData(
        [QUERY_KEY.FOLDERS],
        [
          ...(previousItems || []),
          {
            ...newFolder,
            id: nanoid(10),
            modules: [],
          },
        ]
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
    },
    ...config,
    mutationFn: createFolder,
  })
}
