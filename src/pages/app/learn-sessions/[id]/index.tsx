import { IconCertificate } from '@tabler/icons-react'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Stack, Title, useMantineTheme } from '@mantine/core'
import { PATH } from '@shared/config'
import { LoadingData } from '@shared/ui'
import { useLearnSessionQuery } from '@entities/learn-session'

type LearnSessionProps = {}

export const LearnSession = ({}: LearnSessionProps) => {
  const { colors } = useMantineTheme()
  const { id } = useParams()
  const { data, isLoading } = useLearnSessionQuery({ variables: { id: id as string } })

  if (isLoading || !data) return <LoadingData />

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
