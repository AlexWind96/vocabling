import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import { Button, Group, Modal, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CreateModule } from '@/features/module'
import { PATH } from '@/shared/config'
import { ModulesGrid } from './modules-grid'

export const ModulesPage = () => {
  const [opened, handlers] = useDisclosure(false)
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>Modules</Title>
        <Group>
          <Button color={'amber'} component={Link} to={PATH.all_cards}>
            All cards
          </Button>
          <Button color={'green'} onClick={handlers.open} leftIcon={<Plus />}>
            Create
          </Button>
        </Group>
        <Modal opened={opened} onClose={handlers.close} title="Create module">
          <CreateModule onSuccess={handlers.close} />
        </Modal>
      </Group>
      <ModulesGrid />
    </Stack>
  )
}
