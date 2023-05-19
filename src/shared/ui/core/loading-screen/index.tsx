import React from 'react'
import { Center, Loader, Stack } from '@mantine/core'
import Logo from '@shared/assets/logo.svg'


export const LoadingScreen = () => {
  return (
    <Center w={'100vw'} h={'100vh'}>
      <Stack align={'center'} spacing={4}>
        <img className={'w-24 h-24'} src={Logo} alt={'Lango logo'} />
        <Loader size="lg" variant="dots" />
      </Stack>
    </Center>
  )
}
