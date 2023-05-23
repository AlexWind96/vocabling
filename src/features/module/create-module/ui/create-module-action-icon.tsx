import { IconSquarePlus } from '@tabler/icons-react'
import * as React from 'react'
import { FC } from 'react'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { useCreateModuleModal } from '../use-create-module-modal'

interface ICreateModuleActionIcon extends Omit<ActionIconProps, 'children' | 'onClick'> {
  folderId: string
}

export const CreateModuleActionIcon: FC<ICreateModuleActionIcon> = ({ folderId, ...rest }) => {
  const { openCreateModuleModal } = useCreateModuleModal({ folderId })
  return (
    <ActionIcon onClick={openCreateModuleModal} {...rest}>
      <IconSquarePlus />
    </ActionIcon>
  )
}
