import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpdateCurrentLearnSessionDto } from '@shared/api'
import { useUpdateLearnSessionMutation } from '../update-current-learn-session'

export const useNavigateToNewLearnSession = ({
  params,
}: {
  params: UpdateCurrentLearnSessionDto
}) => {
  const { mutateAsync } = useUpdateLearnSessionMutation()
  const navigate = useNavigate()
  const navigateToNewLearnSession = useCallback(async () => {
    const currentLearnSession = await mutateAsync(params)
    navigate(`/learn-cards/${currentLearnSession.id}`)
  }, [params])

  return { navigateToNewLearnSession }
}
