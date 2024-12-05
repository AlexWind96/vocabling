import { IconFolderX } from '@tabler/icons-react'
import * as React from 'react'
import { FC } from 'react'
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { useDeleteFolderModal } from '../use-delete-folder-modal'

interface IDeleteFolderActionIcon extends Omit<ActionIconProps, 'children' | 'onClick'> {
  id: string
}

export const DeleteFolderActionIcon: FC<IDeleteFolderActionIcon> = ({ id, ...rest }) => {
  const { openDeleteFolderModal } = useDeleteFolderModal({ id })
  return (
    <Tooltip label={'Remove folder'}>
      <ActionIcon onClick={openDeleteFolderModal} {...rest}>
        <IconFolderX />
      </ActionIcon>
    </Tooltip>
  )
}
