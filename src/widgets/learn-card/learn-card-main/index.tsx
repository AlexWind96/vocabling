import * as React from 'react'
import { Skeleton } from '@mantine/core'
import { NoCard, SimpleCard, useLearnCard } from '@/entities/card'

type LearnCardMainProps = {}

export const LearnCardMain = ({}: LearnCardMainProps) => {
  const { data, isLoading } = useLearnCard()

  if (isLoading) return <Skeleton height={150} radius="xl" />

  if (!data) return <NoCard />

  return <SimpleCard data={data} rightSection={null} />
}
