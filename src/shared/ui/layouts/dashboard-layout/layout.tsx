import * as React from 'react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Logout } from 'tabler-icons-react'
import {
  AppShell,
  Box,
  Burger,
  Container,
  MediaQuery,
  ScrollArea,
  Stack,
  UnstyledButtonProps,
} from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { useNavbarLinkStyles } from '../navbar-link.styles'
import { useThemeMediaQuery } from '../use-theme-media-query'
import { Header } from './header'
import { INavbarLink, NavbarCollapsed, NavbarDrawer, NavbarExpand } from './navbar'
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
  const [isDrawerOpened, toggleDrawerOpened] = useToggle([false, true])
  const { isMD, isSM } = useThemeMediaQuery()
  return (
    <AppShell
      fixed={false}
      classNames={{ main: classes.main }}
      padding={0}
      navbar={
        isMD ? (
          <NavbarCollapsed
            navbarLinks={navbarLinks}
            footerActions={
              <LogoutButton className={navbarLinkClasses.link}>
                <Logout />
              </LogoutButton>
            }
          />
        ) : (
          <NavbarExpand
            navbarLinks={navbarLinks}
            footerActions={
              <LogoutButton className={navbarLinkClasses.link} w={'100%'}>
                <Logout className={navbarLinkClasses.linkIcon} />
                <span>Logout</span>
              </LogoutButton>
            }
          />
        )
      }
    >
      {isSM && (
        <NavbarDrawer
          opened={isDrawerOpened}
          navbarLinks={navbarLinks}
          footerActions={
            <LogoutButton className={navbarLinkClasses.link} w={'100%'}>
              <Logout className={navbarLinkClasses.linkIcon} />
              <span>Logout</span>
            </LogoutButton>
          }
          onClose={() => toggleDrawerOpened(false)}
        />
      )}
      <Stack justify={'flex-start'} style={{ height: '100vh' }}>
        <Header
          before={
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={isDrawerOpened}
                onClick={() => toggleDrawerOpened()}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
          }
        />
        {isMD ? (
          <Box style={{ flexGrow: 1 }}>
            <Container fluid pb={'xl'} px={'xl'}>
              <React.Suspense fallback={fallBack}>
                <Outlet />
              </React.Suspense>
            </Container>
          </Box>
        ) : (
          <ScrollArea style={{ flexGrow: 1 }}>
            <Container fluid pb={'xl'} px={'xl'}>
              <React.Suspense fallback={fallBack}>
                <Outlet />
              </React.Suspense>
            </Container>
          </ScrollArea>
        )}
      </Stack>
    </AppShell>
  )
}
