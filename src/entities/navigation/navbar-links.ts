import { IconHexagonLetterM, IconSchool, IconStack2, IconUserCircle } from '@tabler/icons-react'
import { ROLE } from '@/shared/api'
import { PATH } from '@/shared/config'
import { INavbarLink } from './types'

export const navbarLinks: INavbarLink[] = [
  {
    path: `${PATH.modules}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'Modules',
    icon: IconHexagonLetterM,
  },
  {
    path: `${PATH.learn_cards}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'Learn',
    icon: IconSchool,
  },
  {
    path: `${PATH.all_cards}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'All cards',
    icon: IconStack2,
  },
  {
    path: `${PATH.account}`,
    roles: [ROLE.User, ROLE.Admin],
    label: 'Account',
    icon: IconUserCircle,
  },
]

export const mapNavbarLinksByRole = (role): INavbarLink[] => {
  return navbarLinks.filter((route) => route.roles.includes(role))
}
