import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentLearnSession } from '@shared/api'
import { PATH } from '@entities/navigation'
import { useCompleteLearnSessionMutation } from './use-complete-learn-session-mutation'

export const useCompleteLearnSessionEffect = ({
  session,
  learnGoal,
}: {
  session?: CurrentLearnSession
  learnGoal: number
}) => {
  const { mutateAsync } = useCompleteLearnSessionMutation()
  const navigate = useNavigate()
  useEffect(() => {
    if (session && session.countOfCompleted === learnGoal) {
      mutateAsync().then(() => {
        navigate(`/${PATH.learn_sessions}/${session.id}`)
      })
    }
  }, [session, learnGoal])
}
