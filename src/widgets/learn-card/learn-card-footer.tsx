import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Group, Skeleton } from '@mantine/core'
import { useTypedSelector } from '@shared/hooks'
import { useLearnCardQuery } from '@entities/card'
import {
  currentLearnSessionSlice,
  selectCurrentLearnSessionSlice,
} from '@entities/current-learn-session'
import { useRegisterAnswer } from '@features/current-learn-session/register-answer'

type LearnCardFooterProps = {}
const {
  actions: { showResult, cleanState },
} = currentLearnSessionSlice

export const LearnCardFooter = ({}: LearnCardFooterProps) => {
  const { data, isFetching } = useLearnCardQuery()
  const { isShownResult, isProcessingAnswer } = useTypedSelector(selectCurrentLearnSessionSlice)
  const { registerAnswer } = useRegisterAnswer()
  const dispatch = useDispatch()

  const handleShowResult = () => {
    dispatch(showResult())
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!data || isProcessingAnswer) return
    switch (event.code) {
      case 'ArrowDown':
        event.preventDefault()
        handleShowResult()
        break
      case 'ArrowLeft':
        event.preventDefault()
        registerAnswer(data.id, false)
        break
      case 'ArrowRight':
        event.preventDefault()
        registerAnswer(data.id, true)
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      dispatch(cleanState())
    }
  }, [data, isProcessingAnswer])

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
        <Button
          disabled={isProcessingAnswer}
          color={'red'}
          onClick={() => registerAnswer(data.id, false)}
        >
          Wrong
        </Button>
        <Button
          disabled={isProcessingAnswer}
          color={'green'}
          onClick={() => registerAnswer(data.id, true)}
        >
          Right
        </Button>
      </Group>
    )
  } else {
    return <Button onClick={handleShowResult}>Show result</Button>
  }
}
