import { Stack } from '@mantine/core'
import { LearnCardFooter } from './learn-card-footer'
import { LearnCardHeader } from './learn-card-header'
import { LearnCardMain } from './learn-card-main'

type LearnCardProps = {}

export const LearnCard = (props: LearnCardProps) => {
  return (
    <Stack>
      <LearnCardHeader />
      <LearnCardMain />
      <LearnCardFooter />
    </Stack>
  )
}
