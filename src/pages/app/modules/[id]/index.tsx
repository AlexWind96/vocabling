import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import { Button, Grid, Group, Stack, Text, Title } from '@mantine/core'
import { SimpleCard, useCards } from '@/entities/card'
import { useModule } from '@/entities/module'
import { DeleteCard } from '@/features/card/delete-card'
import { LoadingScreen } from '@/shared/ui'

export const ModulePage = () => {
  const { id } = useParams()
  const { data, isLoading: isModuleLoading } = useModule({ id: id! })
  const { data: cards } = useCards({ moduleId: id as string })

  if (isModuleLoading) return <LoadingScreen />

  if (!data) return <Text>Module not found</Text>

  return (
    <Stack>
      <Group position={'apart'}>
        <Title>{data.label}</Title>
        <Button color={'green'} component={Link} to={'add-cards'} leftIcon={<Plus />}>
          Add cards
        </Button>
      </Group>
      <Grid>
        {cards &&
          cards.map((card) => {
            return (
              <React.Fragment key={card.id}>
                <Grid.Col span={1} sm={2} md={3} />
                <Grid.Col span={10} sm={8} md={6}>
                  <SimpleCard data={card} rightSection={<DeleteCard id={card.id} />} />
                </Grid.Col>
                <Grid.Col span={1} sm={2} md={3} />
              </React.Fragment>
            )
          })}
      </Grid>
    </Stack>
  )
}
