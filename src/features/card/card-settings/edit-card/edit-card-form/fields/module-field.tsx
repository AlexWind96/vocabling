import React from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectController } from '@shared/ui'
import { useModulesQuery } from '@entities/module'
import { EditCardFormValues } from '../edit-card-form'

export const ModuleField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditCardFormValues>()
  const { data, isLoading } = useModulesQuery()
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
