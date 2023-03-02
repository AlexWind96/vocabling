import { useMutation } from '@tanstack/react-query'
import { API, Module, QUERY_KEY } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

const toggleToFolder = async ({
  id,
  folderId,
}: {
  id: string
  folderId: string | null
}): Promise<Module> => {
  const { data } = await API.endpoints.module.updateModule(id, { folderId })
  return data
}

type Options = {
  config?: MutationConfig<typeof toggleToFolder>
}

export const useToggleToFolder = ({ config }: Options = {}) => {
  return useMutation({
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY.MODULES])
      queryClient.invalidateQueries([QUERY_KEY.FOLDERS])
    },
    ...config,
    mutationFn: toggleToFolder,
  })
}
