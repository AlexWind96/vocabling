import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Footer as MantineFooter } from '@mantine/core'
import { useNavbarLinkStyles } from '../../navbar-link.styles'
import { INavbarLink } from '../../types'

type FooterProps = {
  navbarLinks: INavbarLink[]
}

export const Footer = ({ navbarLinks }: FooterProps) => {
  const { classes, cx } = useNavbarLinkStyles()

  const links = navbarLinks.map((item) => (
    <NavLink
      to={item.path}
      key={item.label}
      className={({ isActive }) =>
        isActive ? cx(classes.link, classes.linkActive) : cx(classes.link)
      }
    >
      <item.icon />
    </NavLink>
  ))
  return (
    <MantineFooter height={60} className={'flex justify-center gap-x-4 py-1'}>
      {links}
    </MantineFooter>
  )
}
