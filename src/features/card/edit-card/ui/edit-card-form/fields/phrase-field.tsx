import React, { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Chip, Group, Text } from '@mantine/core'
import { EditCardFormValues } from '../edit-card-form'
import { getSentenceUnits } from '../helpers'

export const PhraseField = () => {
  const { control, setValue, formState } = useFormContext<EditCardFormValues>()
  const sentence = useWatch({
    control,
    name: 'sentence',
  })
  const sentenceUnits = getSentenceUnits(sentence)

  useEffect(() => {
    if (formState.isDirty) {
      setValue('phrase', [])
    }
  }, [formState.isDirty])

  return (
    <Controller
      name={'phrase'}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <Group spacing={6}>
          <Chip.Group multiple value={field.value} onChange={field.onChange}>
            {sentenceUnits.length === 0
              ? null
              : sentenceUnits.map((unit, index) => {
                  if (unit.isPunctuation) return null
                  return (
                    <Chip key={unit.value + index} value={`${index}`}>
                      {unit.value}
                    </Chip>
                  )
                })}
          </Chip.Group>
          {invalid && (
            <Text fz={'xs'} c={'red'}>
              {error?.message}
            </Text>
          )}
        </Group>
      )}
    />
  )
}
