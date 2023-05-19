import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import background_dark from '@shared/assets/texture/letters-dark.svg'
import background_light from '@shared/assets/texture/letters.svg'
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
      styles={(theme) => ({
        main: {
          minHeight: '100vh',
          backgroundImage:
            theme.colorScheme === 'dark' ? `url(${background_dark})` : `url(${background_light})`,
          backgroundPosition: 'center',
        },
      })}
    >
      <React.Suspense fallback={fallback}>
        <Outlet />
      </React.Suspense>
    </AppShell>
  )
}
