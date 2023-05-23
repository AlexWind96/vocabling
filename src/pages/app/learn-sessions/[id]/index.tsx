import { IconAlertTriangle, IconCertificate } from '@tabler/icons-react'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Stack, Title, useMantineTheme } from '@mantine/core'
import { LoadingData } from '@shared/ui'
import { useLearnSessionQuery } from '@entities/learn-session'
import { PATH } from '@entities/navigation'

type LearnSessionProps = {}

export const LearnSession = ({}: LearnSessionProps) => {
  const { colors } = useMantineTheme()
  const { id } = useParams()
  const { isLoading, error } = useLearnSessionQuery({ variables: { id: id as string } })

  if (isLoading) return <LoadingData />

  if (error) {
    return (
      <Stack align={'center'}>
        <IconAlertTriangle size={70} color={colors.red[5]} />
        <Title align={'center'} size={40}>
          Session is not completed
        </Title>
        <Button component={Link} to={`/${PATH.learn_cards}`}>
          Back to learning
        </Button>
      </Stack>
    )
  }
  return (
    <Stack align={'center'}>
      <IconCertificate size={70} color={colors.green[5]} />
      <Title size={50}>Daily goal completed</Title>
      <Button component={Link} w={'30%'} to={`/${PATH.learn_cards}`}>
        Back to cards
      </Button>
    </Stack>
  )
}
