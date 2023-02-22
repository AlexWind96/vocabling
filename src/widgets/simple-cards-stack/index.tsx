import React from 'react'
import { Stack, Text } from '@mantine/core'
import { PaginationArgs } from '@/api'
import { SimpleCard, useCards } from '@/entities/card'
import { CardSettings } from '@/features/card'
import { LoadingScreen } from '@/shared/ui'

type CardsProps = {
  moduleId?: string
  paginationArgs?: PaginationArgs
}

export const SimpleCardsStack = ({ moduleId, paginationArgs }: CardsProps) => {
  const { data: cards, isLoading } = useCards({ moduleId, paginationArgs })

  if (isLoading) return <LoadingScreen />

  if (!cards) return <Text>No cards</Text>

  return (
    <Stack>
      {cards.map((card) => {
        return <SimpleCard data={card} key={card.id} rightSection={<CardSettings id={card.id} />} />
      })}
    </Stack>
  )
}
