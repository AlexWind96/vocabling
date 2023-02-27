import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus, X } from 'tabler-icons-react'
import { ActionIcon, Button, Grid, Stack, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { ModuleTitle } from '@/features/module'
import { BackAnchor, ScrollToTop } from '@/shared/ui'
import { Cards } from './cards'

export const ModulePage = () => {
  const { id } = useParams()
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 400)
  return (
    <Stack>
      <BackAnchor>Back to modules</BackAnchor>

      <Grid align={'center'}>
        <Grid.Col span={6} md={3} order={1} orderMd={1}>
          <ModuleTitle moduleId={id as string} />
        </Grid.Col>
        <Grid.Col span={6} md={3} order={2} orderMd={3}>
          <div className={'flex justify-end'}>
            <Button color={'green'} component={Link} to={'add-cards'} leftIcon={<Plus />}>
              Add cards
            </Button>
          </div>
        </Grid.Col>
        <Grid.Col span={12} order={3} md={6} orderMd={2}>
          <TextInput
            placeholder="Search card"
            value={value}
            rightSection={
              <ActionIcon size={'sm'} onClick={() => setValue('')}>
                <X />
              </ActionIcon>
            }
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={1} sm={2} md={3} />
        <Grid.Col span={12} sm={8} md={6}>
          <Cards moduleId={id as string} keywords={debounced} />
        </Grid.Col>
        <Grid.Col span={1} sm={2} md={3} />
      </Grid>
      <ScrollToTop />
    </Stack>
  )
}
