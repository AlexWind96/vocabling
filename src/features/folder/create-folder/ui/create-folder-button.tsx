import { IconPlus } from '@tabler/icons-react'
import React, { FC } from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { useCreateFolderModal } from '../use-create-folder-modal'

interface ICreateFolderButton extends Omit<ButtonProps, 'onClick' | 'leftIcon'> {}

export const CreateFolderButton: FC<ICreateFolderButton> = ({ ...rest }) => {
  const { openCreateFolderModal } = useCreateFolderModal()
  return (
    <Button leftIcon={<IconPlus />} onClick={openCreateFolderModal} {...rest}>
      Create folder
    </Button>
  )
}
