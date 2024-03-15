import { useCallback } from 'react'
import { API } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useLearnCardQuery } from '@entities/card'
import { useCurrentLearnSessionQuery } from '@entities/current-learn-session'

export const useRegisterView = () => {
  const registerView = useCallback(async (id: string) => {
    await API.card.registerView(id)
    await queryClient.invalidateQueries(useLearnCardQuery.getKey())
    await queryClient.invalidateQueries(useCurrentLearnSessionQuery.getKey())
  }, [])

  return { registerView }
}
