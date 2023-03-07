import React from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Grid, Group, Title } from '@mantine/core'
import { useModuleTitle } from '@/entities/module'
import { AddCard } from '@/features/card'
import { BackAnchor, ScrollToTop } from '@/shared/ui'
import { SimpleCardsStack } from '@/widgets/simple-cards-stack'

export const AddCardsPage = () => {
  const { id } = useParams()
  const { data: title } = useModuleTitle({ variables: { id: id as string } })
  return (
    <>
      <Grid gutter={'sm'}>
        <Grid.Col>
          <BackAnchor>Back</BackAnchor>
        </Grid.Col>
        <Grid.Col>
          <Group align={'flex-start'} spacing={2}>
            <Title>Create cards</Title>
            <Badge>{title && `${title}`}</Badge>
          </Group>
        </Grid.Col>
        <Grid.Col>
          <AddCard
            previewSection={
              <SimpleCardsStack moduleId={id as string} paginationArgs={{ first: 3 }} />
            }
          />
        </Grid.Col>
      </Grid>
      <ScrollToTop />
    </>
  )
}
