import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus, X } from 'tabler-icons-react'
import { ActionIcon, Button, Grid, Group, Text, TextInput, Title } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useModule } from '@/entities/module'
import { BackAnchor, LoadingScreen, ScrollToTop } from '@/shared/ui'
import { CardsGrid } from '@/widgets/cards-grid'

export const ModulePage = () => {
  const { id } = useParams()
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 400)
  const { data: module, isInitialLoading } = useModule({ id: id! })

  if (isInitialLoading) return <LoadingScreen />

  if (!module) return <Text>Module not found</Text>

  return (
    <>
      <Grid>
        <Grid.Col>
          <BackAnchor>Back to modules</BackAnchor>
        </Grid.Col>
        <Grid.Col>
          <Group position={'apart'}>
            <Title>{module.label}</Title>
            <TextInput
              placeholder="Search card"
              value={value}
              style={{ flex: 0.5 }}
              rightSection={
                <ActionIcon size={'sm'} onClick={() => setValue('')}>
                  <X />
                </ActionIcon>
              }
              onChange={(event) => setValue(event.currentTarget.value)}
            />
            <Button color={'green'} component={Link} to={'add-cards'} leftIcon={<Plus />}>
              Add cards
            </Button>
          </Group>
        </Grid.Col>
        <CardsGrid moduleId={id as string} keywords={debounced} />
      </Grid>
      <ScrollToTop />
    </>
  )
}
