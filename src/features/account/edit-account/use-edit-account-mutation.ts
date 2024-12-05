import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, UpdateUserDto, User } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useCardsQuery } from '@entities/card'
import { useUserQuery } from '@entities/user'

export const useEditAccountMutation = createMutation<User, UpdateUserDto, AxiosError>({
  mutationFn: async (vars) => {
    return API.auth.updateUser(vars).then((res) => res.data)
  },

  onSuccess: async () => {
    await queryClient.invalidateQueries(useUserQuery.getKey())
  },
})
