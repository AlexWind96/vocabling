import React from 'react'
import { Link } from 'react-router-dom'
import { Anchor, Container, Group, Header as MantineHeader, Space, Title } from '@mantine/core'
import { INavbarLink } from '../../types'
import useStyles from './Header.styles'

type HeaderProps = {
  colorSchemeToggle: React.FC
  links: Omit<INavbarLink, 'roles'>[]
}

export const Header = ({ links, colorSchemeToggle: ColorSchemeToggle }: HeaderProps) => {
  const { classes } = useStyles()

  const items = links.map((link) => (
    <Link key={link.label} to={link.path}>
      <Anchor component="a">{link.label}</Anchor>
    </Link>
  ))

  return (
    <MantineHeader height={56} p={0}>
      <Container className={classes.inner}>
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <Title order={3}>LOGO</Title>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ColorSchemeToggle />
          <Space w={'md'} />
        </Group>
      </Container>
    </MantineHeader>
  )
}
