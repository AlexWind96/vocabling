import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useModules } from '@/entities/module'
import { SelectController } from '@/shared/ui'
import { EditCardFormValues } from '../index'

export const Module = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditCardFormValues>()
  const { data, isLoading } = useModules()
  const modules = data
    ? data.map((module) => {
        return { value: module.id, label: module.label }
      })
    : []
  return (
    <SelectController
      control={control}
      data={modules}
      disabled={isLoading}
      name={'moduleId'}
      placeholder={'Module'}
      label={'Module'}
      error={errors.moduleId?.message}
    />
  )
}
