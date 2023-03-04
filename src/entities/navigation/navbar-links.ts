import { Book, Stack2 } from 'tabler-icons-react'
import { ROLE } from '@/shared/api'
import { PATH } from '@/shared/config'
import { INavbarLink } from './types'

export const navbarLinks: INavbarLink[] = [
  {
    path: `${PATH.modules}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'Modules',
    icon: Stack2,
  },
  {
    path: `${PATH.learn_cards}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'Learn',
    icon: Book,
  },
]

export const mapNavbarLinksByRole = (role): INavbarLink[] => {
  return navbarLinks.filter((route) => route.roles.includes(role))
}
