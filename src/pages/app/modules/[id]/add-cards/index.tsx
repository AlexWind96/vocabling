import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Title } from '@mantine/core'
import { AddCard } from '@/features/card'
import { BackAnchor } from '@/shared/ui'
import { SimpleCardsStack } from '@/widgets/simple-cards-stack'

export const AddCardsPage = () => {
  const { id } = useParams()
  return (
    <Grid gutter={'sm'}>
      <Grid.Col>
        <BackAnchor>Back to module</BackAnchor>
      </Grid.Col>
      <Grid.Col>
        <Title>Create cards</Title>
      </Grid.Col>
      <Grid.Col>
        <AddCard
          previewSection={
            <SimpleCardsStack moduleId={id as string} paginationArgs={{ first: 3 }} />
          }
        />
      </Grid.Col>
    </Grid>
  )
}
