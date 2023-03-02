import { IconFolderOff } from '@tabler/icons'
import * as React from 'react'
import { Menu } from '@mantine/core'
import { useToggleToFolder } from '@/entities/module'

type RemoveFromFolderProps = {
  id: string
}

export const RemoveFromFolder = ({ id }: RemoveFromFolderProps) => {
  const { mutateAsync } = useToggleToFolder()
  const handleClick = async () => {
    await mutateAsync({ id, folderId: null })
  }

  return (
    <Menu.Item icon={<IconFolderOff size={14} />} onClick={handleClick}>
      Remove from folder
    </Menu.Item>
  )
}
