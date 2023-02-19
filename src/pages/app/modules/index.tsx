import React from 'react'
import { Plus } from 'tabler-icons-react'
import { Button, Grid, Group, Modal, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ModuleCard, useModules } from '@/entities/module'
import { CreateModule } from '@/features/module'
import { LoadingScreen } from '@/shared/ui'

export const ModulesPage = () => {
  const { data: modules, isLoading } = useModules()
  const [opened, handlers] = useDisclosure(false)

  if (isLoading) return <LoadingScreen />
  if (!modules) return <Title>No modules</Title>
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>Modules</Title>
        <Button color={'green'} onClick={handlers.open} leftIcon={<Plus />}>
          Create
        </Button>
        <Modal opened={opened} onClose={handlers.close} title="Create module">
          <CreateModule onSuccess={handlers.close} />
        </Modal>
      </Group>
      <Grid>
        {modules.map((module) => {
          return (
            <Grid.Col span={4} key={module.id}>
              <ModuleCard data={module} />
            </Grid.Col>
          )
        })}
      </Grid>
    </Stack>
  )
}
