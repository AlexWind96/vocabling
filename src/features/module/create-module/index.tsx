import * as React from 'react'
import { CreateModuleDTO } from '@/api'
import { useCreateModule } from '@/entities/module'
import { CreateModuleForm } from './create-module-form'

type CreateModuleProps = {
  onSuccess: () => void
}

export const CreateModule = (props: CreateModuleProps) => {
  const { mutateAsync } = useCreateModule()
  const handleSubmit = async (data: CreateModuleDTO) => {
    await mutateAsync(data)
    props.onSuccess()
  }
  return <CreateModuleForm onSubmit={handleSubmit} />
}
