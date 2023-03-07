import { HexagonLetterM, School, Stack2 } from 'tabler-icons-react'
import { ROLE } from '@/shared/api'
import { PATH } from '@/shared/config'
import { INavbarLink } from './types'

export const navbarLinks: INavbarLink[] = [
  {
    path: `${PATH.modules}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'Modules',
    icon: HexagonLetterM,
  },
  {
    path: `${PATH.learn_cards}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'Learn',
    icon: School,
  },
  {
    path: `${PATH.all_cards}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'All cards',
    icon: Stack2,
  },
]

export const mapNavbarLinksByRole = (role): INavbarLink[] => {
  return navbarLinks.filter((route) => route.roles.includes(role))
}
