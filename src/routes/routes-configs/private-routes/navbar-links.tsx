import { Icon, Settings } from 'tabler-icons-react'
import { ROLE } from '@/features/auth'
import { PATH } from '../../path'

export type NavbarLink = {
  path: string
  roles: ROLE[]
  navigation_label: string
  navigation_icon: Icon
}

const navbarLinks: NavbarLink[] = [
  {
    path: `${PATH.words}`,
    roles: [ROLE.User, ROLE.Admin],
    navigation_label: 'Words',
    navigation_icon: Settings,
  },
]

export const mapNavbarLinks = (role: ROLE) => {
  return navbarLinks.filter((route) => route.roles.includes(role))
}
