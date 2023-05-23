import { IconPlus } from '@tabler/icons-react'
import React, { FC } from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { useCreateModuleModal } from '../use-create-module-modal'

interface ICreateModuleButton extends Omit<ButtonProps, 'onClick' | 'leftIcon'> {}

export const CreateModuleButton: FC<ICreateModuleButton> = ({ ...rest }) => {
  const { openCreateModuleModal } = useCreateModuleModal({})
  return (
    <Button leftIcon={<IconPlus />} onClick={openCreateModuleModal} {...rest}>
      Create module
    </Button>
  )
}
