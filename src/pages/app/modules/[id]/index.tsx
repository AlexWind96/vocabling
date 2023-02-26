import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import { Button, Grid, Group, Text, Title } from '@mantine/core'
import { useModule } from '@/entities/module'
import { BackAnchor, LoadingScreen, ScrollToTop } from '@/shared/ui'
import { CardsGrid } from '@/widgets/cards-grid'

export const ModulePage = () => {
  const { id } = useParams()
  const { data: module, isInitialLoading } = useModule({ id: id! })

  if (isInitialLoading) return <LoadingScreen />

  if (!module) return <Text>Module not found</Text>

  return (
    <>
      <Grid>
        <Grid.Col>
          <BackAnchor>Back to modules</BackAnchor>
        </Grid.Col>
        <Grid.Col>
          <Group position={'apart'}>
            <Title>{module.label}</Title>
            <Button color={'green'} component={Link} to={'add-cards'} leftIcon={<Plus />}>
              Add cards
            </Button>
          </Group>
        </Grid.Col>
        <CardsGrid moduleId={id as string} />
      </Grid>
      <ScrollToTop />
    </>
  )
}
