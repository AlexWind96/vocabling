import { IconEdit } from '@tabler/icons-react'
import { FC } from 'react'
import { Menu, MenuItemProps } from '@mantine/core'
import { CardsQueryParams } from '@shared/api'
import { useEditCardModal } from '../use-edit-card-modal'

interface IEditCardMenuItem extends Omit<MenuItemProps, 'icon' | 'onClick'> {
  id: string
  params: CardsQueryParams
}

export const EditCardMenuItem: FC<IEditCardMenuItem> = ({ id, params, ...rest }) => {
  const { openEditCardModal } = useEditCardModal({ id, params })
  return (
    <Menu.Item icon={<IconEdit size={14} />} onClick={openEditCardModal} {...rest}>
      Edit card
    </Menu.Item>
  )
}
