import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Slider, Stack } from '@mantine/core'
import { CardOrderByFields, CardsQueryParams, SortType } from '@shared/api'
import { SelectController } from '@shared/ui'
import { CardFilters } from '@pages/app/all-cards/model'
import { ModuleField } from './fields'
import { getInitialFilterCardsValues } from './helpers'

const filterCardsSchema = z.object({
  moduleId: z.string().nullable(),
  orderBy: z
    .enum([CardOrderByFields.Progress, CardOrderByFields.CreatedAt, CardOrderByFields.Views])
    .nullable()
    .optional(),
  sort: z.enum([SortType.Asc, SortType.Desc]).nullable().optional(),
  step: z.string().nullable().optional(),
  limit: z.number().min(1).max(100),
})

export type FilterCardsFormValues = z.infer<typeof filterCardsSchema>

type FilterCardsFormProps = {
  onSubmit: (values: CardFilters) => void
  defaultValues: CardFilters
}

const steps = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]

export const FilterCardsForm = (props: FilterCardsFormProps) => {
  const methods = useForm<FilterCardsFormValues>({
    resolver: zodResolver(filterCardsSchema),
    mode: 'onChange',
    defaultValues: getInitialFilterCardsValues(props.defaultValues),
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<FilterCardsFormValues> = (data) => {
    const params: CardFilters = {
      moduleId: data.moduleId || undefined,
      orderBy: data.orderBy || undefined,
      step: Number(data.step) || undefined,
      sort: data.sort || undefined,
      limit: data.limit,
    }
    props.onSubmit(params)
  }

  return (
    <FormProvider<FilterCardsFormValues> {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="xs">
          <ModuleField />
          <SelectController
            control={methods.control}
            data={[
              { value: 'progress', label: 'Progress' },
              { value: 'createdAt', label: 'Created At' },
              { value: 'views', label: 'Views' },
            ]}
            name={'orderBy'}
            placeholder={'OrderBy'}
            label={'OrderBy'}
            clearable
          />
          <SelectController
            control={methods.control}
            data={steps}
            name={'step'}
            placeholder={'Step'}
            label={'Step'}
            clearable
          />
          <SelectController
            control={methods.control}
            data={[
              { value: 'asc', label: 'Asc' },
              { value: 'desc', label: 'Desc' },
            ]}
            name={'sort'}
            placeholder={'Sort'}
            label={'Sort'}
            clearable
          />
          <Controller
            name={'limit'}
            control={methods.control}
            render={({ field }) => (
              <Slider
                label={(value) => value.toFixed(0)}
                min={0}
                step={10}
                max={50}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
            Save
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
