import React from 'react'
import { Plus } from 'tabler-icons-react'
import { Button, Grid, Group, Modal, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CreateModule } from '@/features/module'
import { ModulesGrid } from '@/widgets/modules-grid'

export const ModulesPage = () => {
  const [opened, handlers] = useDisclosure(false)
  return (
    <Grid>
      <Grid.Col />
      <Grid.Col>
        <Group position={'apart'}>
          <Title>Modules</Title>
          <Button color={'green'} onClick={handlers.open} leftIcon={<Plus />}>
            Create
          </Button>
          <Modal opened={opened} onClose={handlers.close} title="Create module">
            <CreateModule onSuccess={handlers.close} />
          </Modal>
        </Group>
      </Grid.Col>
      <ModulesGrid />
    </Grid>
  )
}
