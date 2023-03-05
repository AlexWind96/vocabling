import * as React from 'react'
import { Center, Stack } from '@mantine/core'
import { SimpleCard, useCards } from '@/entities/card'
import { CardSettings } from '@/features/card'
import { ErrorAlert, LoadMoreButton, LoadingData, NoData } from '@/shared/ui'

type CardsProps = {
  moduleId: string
  keywords?: string
}

export const Cards = ({ moduleId, keywords }: CardsProps) => {
  const { data, isError, error, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCards({
      variables: {
        moduleId,
        first: 10,
        keywords: keywords ? keywords : undefined,
      },
    })

  if (isSuccess) {
    return (
      <Stack>
        {data.pages.map((group, i) => {
          if (!group.totalCount) {
            return <NoData key={'group' + i} message={'No cards'} />
          }
          return group.edges.map(({ node: card }) => {
            return (
              <SimpleCard key={card.id} data={card} rightSection={<CardSettings id={card.id} />} />
            )
          })
        })}
        <Center>
          <LoadMoreButton
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchCb={fetchNextPage}
          />
        </Center>
      </Stack>
    )
  }
  if (isError) {
    return <ErrorAlert message={error?.message} />
  }
  return <LoadingData />
}
