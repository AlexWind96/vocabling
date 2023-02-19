import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { Header } from './Header'

type HomeLayoutProps = {
  fallback: React.ReactNode
  colorSchemeToggle: React.FC
}

export function HomeLayout({ fallback, colorSchemeToggle }: HomeLayoutProps) {
  return (
    <AppShell
      padding={0}
      header={<Header links={[]} colorSchemeToggle={colorSchemeToggle} />}
      styles={() => ({
        main: {
          minHeight: '100vh',
        },
      })}
    >
      <React.Suspense fallback={fallback}>
        <Outlet />
      </React.Suspense>
    </AppShell>
  )
}
