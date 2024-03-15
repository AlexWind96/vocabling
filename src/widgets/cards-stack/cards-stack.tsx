import * as React from 'react'
import { useEffect } from 'react'
import { Center, Stack } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { CardsQueryParams } from '@shared/api'
import { LoadingData, NoData, SettingsMenu } from '@shared/ui'
import { BaseCard, useCardsQuery } from '@entities/card'
import { DeleteCardMenuItem } from '@features/card/delete-card'
import { EditCardMenuItem } from '@features/card/edit-card'
import { useRegisterViewMutation } from '@features/current-learn-session/register-view'

type CardsStackProps = {
  params: CardsQueryParams
  showModules?: boolean
  limit?: number
  expandComments?: boolean
}

export const CardsStack = ({
  params,
  showModules = false,
  limit = Infinity,
  expandComments,
}: CardsStackProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCardsQuery({
    variables: params,
    useErrorBoundary: true,
    suspense: true,
  })
  const { ref, entry } = useIntersection({
    threshold: 1,
  })
  const { mutateAsync } = useRegisterViewMutation()
  useEffect(() => {
    const pagesCount = data?.pages.length || 0
    const countPerPage = params.first || 0
    const countOfFetched = pagesCount * countPerPage
    if (entry?.isIntersecting && hasNextPage && countOfFetched < limit) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage, data?.pages.length, limit, params.first])

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
                expandComments={expandComments}
                showModule={showModules}
                key={card.id}
                data={card}
                onViewed={() => {
                  void mutateAsync({ id: card.id })
                }}
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
