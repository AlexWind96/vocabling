import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Group, Skeleton } from '@mantine/core'
import { useLearnCard } from '@/entities/card'
import {
  currentLearnSessionSlice,
  selectCurrentLearnSessionSlice,
  useCurrentLearnSession,
} from '@/entities/current-learn-session'
import { RegisterAnswer, registerAnswer } from '@/features/current-learn-session/register-answer'
import { useTypedSelector } from '@/shared/hooks'
import { queryClient } from '@/shared/lib/react-query'

type LearnCardFooterProps = {}
const {
  actions: { showResult, cleanState },
} = currentLearnSessionSlice

export const LearnCardFooter = ({}: LearnCardFooterProps) => {
  const { data, isFetching } = useLearnCard()
  const { isShownResult } = useTypedSelector(selectCurrentLearnSessionSlice)
  const dispatch = useDispatch()

  const handleShowResult = () => {
    dispatch(showResult())
  }

  const handleRegisterAnswerClick = async (id: string, isRight: boolean) => {
    await dispatch(registerAnswer.request({ id, isRight }))
    await queryClient.invalidateQueries(useLearnCard.getKey())
    await queryClient.invalidateQueries(useCurrentLearnSession.getKey())
  }

  useEffect(() => {
    return () => {
      dispatch(cleanState())
    }
  }, [])

  if (isFetching)
    return (
      <Group position={'apart'}>
        <Skeleton height={40} width={70} radius="lg" />
        <Skeleton height={40} width={70} radius="lg" />
      </Group>
    )
  if (!data) return null

  if (isShownResult) {
    return (
      <Group position={'apart'}>
        <RegisterAnswer color={'red'} onClick={() => handleRegisterAnswerClick(data.id, false)}>
          Wrong
        </RegisterAnswer>
        <RegisterAnswer color={'green'} onClick={() => handleRegisterAnswerClick(data.id, true)}>
          Right
        </RegisterAnswer>
      </Group>
    )
  } else {
    return <Button onClick={handleShowResult}>Show result</Button>
  }
}
