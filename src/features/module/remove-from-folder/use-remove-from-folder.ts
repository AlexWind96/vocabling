import { useCallback } from 'react'
import { useUpdateModuleMutation } from '../use-update-module-mutation'

export const useRemoveFromFolder = ({ id }: { id: string }) => {
  const { mutateAsync } = useUpdateModuleMutation()
  const removeFromFolder = useCallback(async () => {
    await mutateAsync({ id, body: { folderId: null } })
  }, [])

  return { removeFromFolder }
}
