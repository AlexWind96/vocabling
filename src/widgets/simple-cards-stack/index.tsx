import React from 'react'
import { Stack, Text } from '@mantine/core'
import { SimpleCard, useCards } from '@/entities/card'
import { CardSettings } from '@/features/card'
import { PaginationArgs } from '@/shared/api'
import { LoadingScreen } from '@/shared/ui'

type CardsProps = {
  moduleId?: string
  paginationArgs?: PaginationArgs
}

export const SimpleCardsStack = ({ moduleId, paginationArgs }: CardsProps) => {
  const { data, isLoading } = useCards({
    params: {
      moduleId,
      ...paginationArgs,
    },
  })

  if (isLoading) return <LoadingScreen />

  if (!data) return <Text>No cards</Text>

  return (
    <Stack>
      {data.pages.map((group) => {
        return group.cards.map((card) => {
          return (
            <SimpleCard data={card} key={card.id} rightSection={<CardSettings id={card.id} />} />
          )
        })
      })}
    </Stack>
  )
}
