import React, { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Chip, Text } from '@mantine/core'
import { getSentenceUnits } from '../helpers'
import { CardFormValues } from '../model'

export const Phrase = () => {
  const { control, setValue, formState } = useFormContext<CardFormValues>()
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
        <>
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
        </>
      )}
    />
  )
}
