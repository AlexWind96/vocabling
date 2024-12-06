import * as React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Group, Skeleton } from '@mantine/core'
import { useAppDispatch, useTypedSelector } from '@shared/hooks'
import {
  currentLearnSessionSlice,
  registerAnswer,
  selectCurrentLearnSessionSlice,
} from '@entities/current-learn-session'
import { PATH } from '@entities/navigation'

const {
  actions: { setIsHidden },
} = currentLearnSessionSlice

export const LearnCardFooter = () => {
  const { isLoading, currentCard, isHidden, isDisabled, session } = useTypedSelector(
    selectCurrentLearnSessionSlice
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleShowResult = () => {
    dispatch(setIsHidden(false))
  }

  const handleRightAnswerAction = async (id: string) => {
    const resp = await dispatch(registerAnswer({ id, value: true })).unwrap()
    if (resp.isCompleted) {
      navigate(`/${PATH.learn_sessions}/${session?.id}`)
    }
  }
  const handleWrongAnswerAction = async (id: string) => {
    const resp = await dispatch(registerAnswer({ id, value: false })).unwrap()
    if (resp.isCompleted) {
      navigate(`/${PATH.learn_sessions}/${session?.id}`)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!currentCard || isDisabled) return
    switch (event.code) {
      case 'ArrowDown':
        event.preventDefault()
        handleShowResult()
        break
      case 'ArrowLeft':
        event.preventDefault()
        handleWrongAnswerAction(currentCard.id)
        break
      case 'ArrowRight':
        event.preventDefault()
        handleRightAnswerAction(currentCard.id)
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentCard, isDisabled])

  if (isLoading)
    return (
      <Group position={'apart'}>
        <Skeleton height={40} width={70} radius="lg" />
        <Skeleton height={40} width={70} radius="lg" />
      </Group>
    )
  if (!currentCard) return null

  if (!isHidden) {
    return (
      <Group position={'apart'}>
        <Button
          disabled={isDisabled}
          color={'red'}
          onClick={() => {
            handleWrongAnswerAction(currentCard.id)
          }}
        >
          Wrong
        </Button>
        <Button
          disabled={isDisabled}
          color={'green'}
          onClick={() => handleRightAnswerAction(currentCard.id)}
        >
          Right
        </Button>
      </Group>
    )
  } else {
    return <Button onClick={handleShowResult}>Show result</Button>
  }
}
