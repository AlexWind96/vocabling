import * as React from 'react'
import { Alert, Button, Center, Grid, Stack, Title } from '@mantine/core'
import { SimpleCard, useCards } from '@/entities/card'
import { CardSettings } from '@/features/card'
import { LoadingScreen } from '@/shared/ui'

type CardsGridProps = {
  moduleId: string
}

export const CardsGrid = ({ moduleId }: CardsGridProps) => {
  const {
    data,
    isInitialLoading,
    isError,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCards({
    params: {
      moduleId,
      first: 3,
    },
  })
  let content: React.ReactNode = null

  if (isInitialLoading) {
    content = (
      <Grid.Col>
        <LoadingScreen />
      </Grid.Col>
    )
  }
  if (isError) {
    content = (
      <Grid.Col>
        <Alert title={'Error'}>{error.message || 'Error while loading modules'}</Alert>
      </Grid.Col>
    )
  }
  if (isSuccess) {
    if (data.pages) {
      content = (
        <Stack>
          {data.pages.map((group) => {
            return group.cards.map((card) => {
              return (
                <SimpleCard
                  key={card.id}
                  data={card}
                  rightSection={<CardSettings id={card.id} />}
                />
              )
            })
          })}
          <Center>
            <Button
              onClick={() => {
                fetchNextPage()
              }}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
            </Button>
          </Center>
        </Stack>
      )
    } else {
      content = (
        <Grid.Col>
          <Title order={2}>No cards</Title>
        </Grid.Col>
      )
    }
  }

  return (
    <>
      <Grid.Col span={1} sm={2} md={3} />
      <Grid.Col span={12} sm={8} md={6}>
        {content}
      </Grid.Col>
      <Grid.Col span={1} sm={2} md={3} />
    </>
  )
}
