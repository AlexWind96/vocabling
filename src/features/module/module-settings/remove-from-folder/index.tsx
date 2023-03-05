import { IconFolderOff } from '@tabler/icons'
import * as React from 'react'
import { Menu } from '@mantine/core'
import { useUpdateModule } from '../../use-update-module'

type RemoveFromFolderProps = {
  id: string
}

export const RemoveFromFolder = ({ id }: RemoveFromFolderProps) => {
  const { mutateAsync } = useUpdateModule()
  const handleClick = async () => {
    await mutateAsync({ id, body: { folderId: null } })
  }

  return (
    <Menu.Item icon={<IconFolderOff size={14} />} onClick={handleClick}>
      Remove from folder
    </Menu.Item>
  )
}
