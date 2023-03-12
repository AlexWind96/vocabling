import { IconArrowLeft } from '@tabler/icons-react'
import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ActionIcon, Grid, Footer as MantineFooter } from '@mantine/core'
import { useNavbarLinkStyles } from '../../navbar-link.styles'
import { INavbarLink } from '../../types'

type FooterProps = {
  navbarLinks: INavbarLink[]
}

export const Footer = ({ navbarLinks }: FooterProps) => {
  const { classes, cx, theme } = useNavbarLinkStyles()
  const navigate = useNavigate()
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
    <MantineFooter
      height={60}
      bg={theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white}
    >
      <Grid align={'center'} py={4}>
        <Grid.Col span={3}>
          <ActionIcon color={'primary'} onClick={() => navigate(-1)} ml={10}>
            <IconArrowLeft size={20} />
          </ActionIcon>
        </Grid.Col>

        <Grid.Col span={6}>
          <div className={'flex justify-center gap-2'}>{links}</div>
        </Grid.Col>
        <Grid.Col span={3} />
      </Grid>
    </MantineFooter>
  )
}
