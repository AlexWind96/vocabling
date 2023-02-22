import * as React from 'react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Logout } from 'tabler-icons-react'
import { AppShell, Burger, Container, MediaQuery, UnstyledButtonProps } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNavbarLinkStyles } from '../navbar-link.styles'
import { INavbarLink } from '../types'
import { useThemeMediaQuery } from '../use-theme-media-query'
import { Header } from './header'
import { NavbarCollapsed, NavbarDrawer } from './navbar'
import useStyles from './styles'

type DashboardLayoutProps = {
  navbarLinks?: INavbarLink[]
  logoutButton: React.FC<Omit<UnstyledButtonProps, 'onClick' | 'disabled'>>
  fallBack: React.ReactNode
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  navbarLinks = [],
  logoutButton: LogoutButton,
  fallBack,
}) => {
  const { classes } = useStyles()
  const { classes: navbarLinkClasses } = useNavbarLinkStyles()
  const [isDrawerOpened, { toggle, close }] = useDisclosure(false)
  const { isSM } = useThemeMediaQuery()
  return (
    <AppShell
      classNames={{ main: classes.main }}
      padding={10}
      navbar={
        <NavbarCollapsed
          navbarLinks={navbarLinks}
          footerActions={
            <LogoutButton className={navbarLinkClasses.link}>
              <Logout />
            </LogoutButton>
          }
        />
      }
      header={
        isSM ? undefined : (
          <Header
            before={
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger opened={isDrawerOpened} onClick={toggle} size="sm" mr="xl" />
              </MediaQuery>
            }
          />
        )
      }
      layout={isSM ? 'alt' : 'default'}
    >
      {!isSM && (
        <NavbarDrawer
          opened={isDrawerOpened}
          navbarLinks={navbarLinks}
          footerActions={
            <LogoutButton className={navbarLinkClasses.link} w={'100%'}>
              <Logout className={navbarLinkClasses.linkIcon} />
              <span>Logout</span>
            </LogoutButton>
          }
          onClose={close}
        />
      )}
      <Container px={{ base: 'lg', md: 100 }} py={{ base: 'xs', sm: 'md' }} fluid>
        <React.Suspense fallback={fallBack}>
          <Outlet />
        </React.Suspense>
      </Container>
    </AppShell>
  )
}
