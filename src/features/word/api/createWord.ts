import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { useMutation } from 'react-query'
import { MutationConfig } from '@/lib/react-query'
import { WordsService } from '../../../services/firebase/Database.service'
import { CreateWordFormValues } from '../types'
import { WordDataDTO } from '../types/api'

export const createWord = async (data: CreateWordFormValues) => {
  return WordsService.createWithId(data, nanoid(10))
}

type Options = {
  config?: MutationConfig<typeof createWord>
}

export const useCreateWord = ({ config }: Options = {}) => {
  return useMutation({
    ...config,
    mutationFn: createWord,
  })
}
