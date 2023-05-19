import * as React from 'react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell, Box, Container, ScrollArea, Stack } from '@mantine/core'
import { useThemeMediaQuery } from '../use-theme-media-query'
import { NavbarCollapsed, NavbarDrawer, NavbarExpand } from './navbar'
import useStyles from './styles'


type LayoutExtensions = {
  NavbarCollapsed: typeof NavbarCollapsed
  NavbarExpand: typeof NavbarExpand
  NavbarDrawer: typeof NavbarDrawer
}

type LayoutProps = {
  navbar: React.ReactElement
  header: React.ReactNode
  fallback: React.ReactNode
}

export const Layout: FC<LayoutProps> & LayoutExtensions = ({ navbar, header, fallback }) => {
  const { classes } = useStyles()
  const { isMD, isSM } = useThemeMediaQuery()
  return (
    <AppShell fixed={false} classNames={{ main: classes.main }} padding={0} navbar={navbar}>
      {isSM && navbar}
      <Stack justify={'flex-start'} style={{ height: '100vh' }}>
        {header}
        {isMD ? (
          <Box style={{ flexGrow: 1 }}>
            <Container fluid pb={'xl'} px={'xl'}>
              <React.Suspense fallback={fallback}>
                <Outlet />
              </React.Suspense>
            </Container>
          </Box>
        ) : (
          <ScrollArea style={{ flexGrow: 1 }}>
            <Container fluid pb={'xl'} px={'xl'}>
              <React.Suspense fallback={fallback}>
                <Outlet />
              </React.Suspense>
            </Container>
          </ScrollArea>
        )}
      </Stack>
    </AppShell>
  )
}

Layout.NavbarCollapsed = NavbarCollapsed
Layout.NavbarExpand = NavbarExpand
Layout.NavbarDrawer = NavbarDrawer
