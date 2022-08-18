import React from 'react'
import { Grid } from '@mantine/core'
import { CreateWordForm } from '@/features/word'
import { useCreateWord } from '../../../features/word/api/createWord'

export const CreateWord = () => {
  const { mutateAsync } = useCreateWord()

  const handleSubmit = async (data) => {
    await mutateAsync(data)
  }
  return (
    <Grid>
      <Grid.Col md={6}>
        <CreateWordForm onSubmit={handleSubmit} />
      </Grid.Col>
    </Grid>
  )
}
