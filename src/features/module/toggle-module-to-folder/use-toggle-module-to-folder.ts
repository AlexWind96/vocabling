import { useToggleModuleToFolderMutation } from './use-toggle-module-to-folder-mutation'

export const useToggleModuleToFolder = () => {
  const { mutate, isLoading } = useToggleModuleToFolderMutation()
  const toggleModuleToFolder = ({
    moduleId,
    hasFolder,
    folderId,
  }: {
    moduleId: string
    folderId: string
    hasFolder: boolean
  }) => {
    if (hasFolder) {
      mutate({ id: moduleId, body: { folderId: null } })
    } else {
      mutate({
        id: moduleId,
        body: {
          folderId,
        },
      })
    }
  }
  return { toggleModuleToFolder, isLoading }
}
