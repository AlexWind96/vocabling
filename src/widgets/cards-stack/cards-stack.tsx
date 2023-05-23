import * as React from 'react'
import { useEffect } from 'react'
import { Center, Stack } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { CardsQueryParams } from '@shared/api'
import { LoadingData, NoData, SettingsMenu } from '@shared/ui'
import { BaseCard, useCardsQuery } from '@entities/card'
import { DeleteCardMenuItem } from '@features/card/delete-card'
import { EditCardMenuItem } from '@features/card/edit-card'

type CardsStackProps = {
  params: CardsQueryParams
  showModules?: boolean
}

export const CardsStack = ({ params, showModules = false }: CardsStackProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCardsQuery({
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
              <BaseCard
                showModule={showModules}
                key={card.id}
                data={card}
                rightSection={
                  <SettingsMenu>
                    <EditCardMenuItem id={card.id} params={params} />
                    <DeleteCardMenuItem id={card.id} params={params} />
                  </SettingsMenu>
                }
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
