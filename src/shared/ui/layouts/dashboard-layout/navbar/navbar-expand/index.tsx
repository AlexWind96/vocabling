import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Anchor, Group, Navbar, ScrollArea } from '@mantine/core'
import { useNavbarLinkStyles } from '../../../navbar-link.styles'
import { INavbarLink } from '../../../types'
import useStyles from './styles'


type NavbarExpandProps = {
  navbarLinks: INavbarLink[]
  footerActions: React.ReactNode
  title?: string
}

export const NavbarExpand: FC<NavbarExpandProps> = ({
  navbarLinks,
  footerActions,
  title = 'LOGO',
}) => {
  const { classes, cx } = useStyles()
  const { classes: navbarLink } = useNavbarLinkStyles()

  const links = navbarLinks.map((item) => (
    <NavLink
      to={item.path}
      key={item.label}
      className={({ isActive }) =>
        isActive ? cx(navbarLink.link, navbarLink.linkActive) : cx(navbarLink.link)
      }
    >
      <item.icon className={navbarLink.linkIcon} />
      <span>{item.label}</span>
    </NavLink>
  ))
  return (
    <Navbar height={'100vh'} width={{ base: 250 }} p="sm" hiddenBreakpoint={'sm'} hidden={true}>
      <Navbar.Section>
        <Group className={classes.header} position="apart">
          {/*TODO extract*/}
          <Anchor to={'/home'} component={NavLink}>
            {title}
          </Anchor>
        </Group>
      </Navbar.Section>
      <Navbar.Section component={ScrollArea} grow>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>{footerActions}</Navbar.Section>
    </Navbar>
  )
}
