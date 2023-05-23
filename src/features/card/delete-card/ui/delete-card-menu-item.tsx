import { IconEdit } from '@tabler/icons-react'
import { FC } from 'react'
import { Menu, MenuItemProps } from '@mantine/core'
import { CardsQueryParams } from '@shared/api'
import { useDeleteCardModal } from '../use-delete-card-modal'

interface IDeleteCardMenuItem extends Omit<MenuItemProps, 'icon' | 'onClick'> {
  id: string
  params: CardsQueryParams
}

export const DeleteCardMenuItem: FC<IDeleteCardMenuItem> = ({ id, params, ...rest }) => {
  const { openDeleteCardModal } = useDeleteCardModal({ id, params })
  return (
    <Menu.Item icon={<IconEdit size={14} />} onClick={openDeleteCardModal} {...rest}>
      Delete card
    </Menu.Item>
  )
}
