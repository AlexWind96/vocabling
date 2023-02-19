import React from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Title } from '@mantine/core'
import { AddCard } from '@/features/card'
import { SimpleCardsStack } from '@/widgets/simple-cards-stack'

export const AddCardsPage = () => {
  const { id } = useParams()
  return (
    <Stack>
      <Title>Create cards</Title>
      <AddCard
        previewSection={<SimpleCardsStack moduleId={id as string} paginationArgs={{ first: 3 }} />}
      />
    </Stack>
  )
}
