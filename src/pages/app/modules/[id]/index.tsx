import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import { Button, Grid, Group, Text, Title } from '@mantine/core'
import { SimpleCard, useCards } from '@/entities/card'
import { useModule } from '@/entities/module'
import { CardSettings } from '@/features/card'
import { BackAnchor, LoadingScreen } from '@/shared/ui'

export const ModulePage = () => {
  const { id } = useParams()
  const { data, isLoading: isModuleLoading } = useModule({ id: id! })
  const { data: cards } = useCards({ moduleId: id as string })

  if (isModuleLoading) return <LoadingScreen />

  if (!data) return <Text>Module not found</Text>

  return (
    <Grid>
      <Grid.Col>
        <BackAnchor>Back to modules</BackAnchor>
      </Grid.Col>
      <Grid.Col>
        <Group position={'apart'}>
          <Title>{data.label}</Title>
          <Button color={'green'} component={Link} to={'add-cards'} leftIcon={<Plus />}>
            Add cards
          </Button>
        </Group>
      </Grid.Col>
      {cards &&
        cards.map((card) => {
          return (
            <React.Fragment key={card.id}>
              <Grid.Col span={1} sm={2} md={3} />
              <Grid.Col span={10} sm={8} md={6}>
                <SimpleCard data={card} rightSection={<CardSettings id={card.id} />} />
              </Grid.Col>
              <Grid.Col span={1} sm={2} md={3} />
            </React.Fragment>
          )
        })}
    </Grid>
  )
}
