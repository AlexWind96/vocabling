import React from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Grid, Group, MediaQuery, Title } from '@mantine/core'
import { QueryWrapper } from '@shared/lib/react-query'
import { BackAnchor, ScrollToTop } from '@shared/ui'
import { useModuleTitle } from '@entities/module'
import { AddCardForm } from '@features/card/add-card'
import { CardsStack } from '@widgets/cards-stack'

export const AddCardsPage = () => {
  const { id } = useParams()
  const { data: title } = useModuleTitle({ variables: { id: id as string } })
  return (
    <>
      <Grid gutter={'sm'}>
        <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
          <Grid.Col>
            <BackAnchor>Back</BackAnchor>
          </Grid.Col>
        </MediaQuery>
        <Grid.Col>
          <Group align={'flex-start'} spacing={2}>
            <Title>Create cards</Title>
            <Badge>{title && `${title}`}</Badge>
          </Group>
        </Grid.Col>
        <Grid.Col>
          <AddCardForm
            previewSection={
              <QueryWrapper>
                <CardsStack params={{ moduleId: id as string, first: 3 }} />
              </QueryWrapper>
            }
          />
        </Grid.Col>
      </Grid>
      <ScrollToTop />
    </>
  )
}
