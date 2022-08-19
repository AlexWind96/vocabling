import axios from 'axios'
import { useMutation } from 'react-query'
import { MutationConfig } from '@/lib/react-query'
import { SheetWordDataDTO } from '../types/api'

export const sendWords = async (data: SheetWordDataDTO[]) => {
  return axios.post('https://sheet.best/api/sheets/5fc2f2c8-7509-4c23-b045-8cc1f5b583e5', data)
}

type Options = {
  config?: MutationConfig<typeof sendWords>
}

export const useSendWords = ({ config }: Options = {}) => {
  return useMutation({
    ...config,
    mutationFn: sendWords,
  })
}
