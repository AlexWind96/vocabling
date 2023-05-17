import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Anchor, Center, Navbar, Stack, Tooltip } from '@mantine/core'
import { useNavbarLinkStyles } from '../../../navbar-link.styles'
import { INavbarLink } from '../../../types'

type NavbarExpandProps = {
  navbarLinks: INavbarLink[]
  footerActions: React.ReactNode
  title?: string
}

export const NavbarCollapsed: FC<NavbarExpandProps> = ({
  navbarLinks,
  footerActions,
  title = 'LANGO',
}) => {
  const { classes, cx } = useNavbarLinkStyles()

  const links = navbarLinks.map((item) => (
    <Tooltip
      key={item.label}
      label={item.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
    >
      <NavLink
        to={item.path}
        key={item.label}
        className={({ isActive }) =>
          isActive ? cx(classes.link, classes.linkActive) : cx(classes.link)
        }
      >
        <item.icon />
      </NavLink>
    </Tooltip>
  ))

  return (
    <Navbar height={'100vh'} width={{ base: 80 }} p="md" hiddenBreakpoint={'sm'} hidden={true}>
      <Navbar.Section>
        <Center>
          {/*TODO extract*/}
          <Anchor fw={'bold'} to={'/home'} component={NavLink}>
            {title}
          </Anchor>
        </Center>
      </Navbar.Section>
      <Navbar.Section grow mt={50}>
        <Stack align="center" spacing={3}>
          {links}
        </Stack>
      </Navbar.Section>

      <Navbar.Section>
        <Stack align="center" spacing={0}>
          {footerActions}
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
