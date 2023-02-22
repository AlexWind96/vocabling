import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'tabler-icons-react'
import { ActionIcon, Drawer, Group, Navbar, ScrollArea, Title } from '@mantine/core'
import { useNavbarLinkStyles } from '../../../navbar-link.styles'
import { INavbarLink } from '../../../types'
import useStyles from './styles'

type NavbarExpandProps = {
  opened: boolean
  navbarLinks: INavbarLink[]
  footerActions: React.ReactNode
  title?: string
  onClose: () => void
}

export const NavbarDrawer: FC<NavbarExpandProps> = ({
  navbarLinks,
  footerActions,
  title = 'LOGO',
  onClose,
  opened,
}) => {
  const { classes } = useStyles()
  const { classes: navbarLink, cx } = useNavbarLinkStyles()

  const links = navbarLinks.map((item) => (
    <NavLink
      to={item.path}
      key={item.label}
      className={({ isActive }) =>
        isActive ? cx(navbarLink.link, navbarLink.linkActive) : cx(navbarLink.link)
      }
      onClick={onClose}
    >
      <item.icon className={navbarLink.linkIcon} />
      <span>{item.label}</span>
    </NavLink>
  ))

  return (
    <Drawer
      opened={opened}
      title={undefined}
      onClose={onClose}
      padding="sm"
      size="md"
      withCloseButton={false}
    >
      <Group className={classes.header} position="apart">
        <Title order={3}>{title}</Title>
        <ActionIcon onClick={onClose} size="sm" mr="xl">
          <X />
        </ActionIcon>
      </Group>
      <Navbar className={classes.nav} p="sm">
        <Navbar.Section component={ScrollArea} grow mt={10}>
          {links}
        </Navbar.Section>
        <Navbar.Section className={classes.footer}>{footerActions}</Navbar.Section>
      </Navbar>
    </Drawer>
  )
}
