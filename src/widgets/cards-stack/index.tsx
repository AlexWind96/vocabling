import * as React from 'react'
import { useEffect } from 'react'
import { Center, Stack } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { SimpleCard, useCards } from '@/entities/card'
import { CardSettings } from '@/features/card/card-settings'
import { CardsQueryParams } from '@/shared/api'
import { LoadingData, NoData } from '@/shared/ui'

type CardsStackProps = {
  params: CardsQueryParams
  showModules?: boolean
}

export const CardsStack = ({ params, showModules = false }: CardsStackProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCards({
    variables: params,
    useErrorBoundary: true,
    suspense: true,
  })
  const { ref, entry } = useIntersection({
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting])

  return (
    <Stack pos={'relative'}>
      {data &&
        data.pages.map((group, i) => {
          if (!group.totalCount) {
            return <NoData key={'group' + i} message={'No cards'} />
          }
          return group.edges.map(({ node: card }) => {
            return (
              <SimpleCard
                showModule={showModules}
                key={card.id}
                data={card}
                rightSection={<CardSettings id={card.id} params={params} />}
              />
            )
          })
        })}
      <Center>
        <div ref={ref} />
        {isFetchingNextPage && <LoadingData />}
      </Center>
    </Stack>
  )
}
