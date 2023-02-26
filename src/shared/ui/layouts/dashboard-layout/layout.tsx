import * as React from 'react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Logout } from 'tabler-icons-react'
import { AppShell, Container, UnstyledButtonProps } from '@mantine/core'
import { useNavbarLinkStyles } from '../navbar-link.styles'
import { INavbarLink } from '../types'
import { useThemeMediaQuery } from '../use-theme-media-query'
import { Footer } from './footer'
import { NavbarCollapsed } from './navbar'
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
  const { isSM } = useThemeMediaQuery()
  return (
    <AppShell
      classNames={{ main: classes.main }}
      padding={10}
      navbar={
        isSM ? (
          <NavbarCollapsed
            navbarLinks={navbarLinks}
            footerActions={
              <LogoutButton className={navbarLinkClasses.link}>
                <Logout />
              </LogoutButton>
            }
          />
        ) : undefined
      }
      layout={isSM ? 'alt' : 'default'}
      footer={!isSM ? <Footer navbarLinks={navbarLinks} /> : undefined}
    >
      <Container px={{ base: 'lg', md: 100 }} py={{ base: 'xs', sm: 'md' }} fluid>
        <React.Suspense fallback={fallBack}>
          <Outlet />
        </React.Suspense>
      </Container>
    </AppShell>
  )
}
