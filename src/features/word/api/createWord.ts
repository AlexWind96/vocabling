import { nanoid } from '@reduxjs/toolkit'
import { useMutation } from 'react-query'
import { MutationConfig, queryClient } from '@/lib/react-query'
import { WordsService } from '../../../services'
import { CreateWordDataDTO, WordDataDTO } from '../types/api'

export const createWord = async (data: CreateWordDataDTO) => {
  return WordsService.createWithId(data, nanoid(10))
}

type Options = {
  config?: MutationConfig<typeof createWord>
}

export const useCreateWord = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (newExamination) => {
      await queryClient.cancelQueries(['words'])

      const previousItems = queryClient.getQueryData<WordDataDTO[]>(['words'])

      queryClient.setQueryData(
        ['words'],
        [
          ...(previousItems || []),
          {
            ...newExamination,
            id: nanoid(10),
          },
        ]
      )

      return { previousItems }
    },
    onError: (_, __, context: any) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['words'], context.previousItems)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['words'])
    },
    ...config,
    mutationFn: createWord,
  })
}
