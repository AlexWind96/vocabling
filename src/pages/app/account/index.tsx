import * as React from 'react'
import { Group, Stack, Text, Title } from '@mantine/core'
import { ColorSchemeSwitch } from '@entities/ui-config'
import { EditAccountFormContainer } from '@features/account/edit-account'
import { LogoutButton } from '@features/auth/logout'

type AccountPageProps = {}

export const AccountPage = (props: AccountPageProps) => {
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>Account</Title>
      </Group>
      <Group>
        <Text fw={'bold'}>Color mode:</Text>
        <ColorSchemeSwitch />
      </Group>
      <EditAccountFormContainer />
      <LogoutButton>Log out</LogoutButton>
    </Stack>
  )
}
