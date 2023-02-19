import * as React from 'react'
import { Group, Skeleton } from '@mantine/core'
import { useLearnCard } from '@/entities/card'
import { RegisterRightAnswer, RegisterWrongAnswer } from '@/features/card'

type LearnCardFooterProps = {}

export const LearnCardFooter = ({}: LearnCardFooterProps) => {
  const { data, isLoading } = useLearnCard()

  if (isLoading)
    return (
      <Group position={'apart'}>
        <Skeleton height={40} width={70} radius="lg" />
        <Skeleton height={40} width={70} radius="lg" />
      </Group>
    )
  if (!data) return null

  return (
    <Group position={'apart'}>
      <RegisterWrongAnswer id={data.id} />
      <RegisterRightAnswer id={data.id} />
    </Group>
  )
}
