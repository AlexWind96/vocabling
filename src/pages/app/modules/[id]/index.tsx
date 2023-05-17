import { IconPlus, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ActionIcon, Button, Grid, MediaQuery, Stack, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { ModuleTitle } from '@/features/module/module-title'
import { QueryWrapper } from '@/shared/lib/react-query'
import { BackAnchor, CardSkeletons, ScrollToTop } from '@/shared/ui'
import { CardsStack } from '@/widgets/cards-stack'

export const ModulePage = () => {
  const { id } = useParams()
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 400)
  return (
    <Stack>
      <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
        <BackAnchor>Back to modules</BackAnchor>
      </MediaQuery>
      <Grid align={'center'}>
        <Grid.Col span={6} md={3} order={1} orderMd={1}>
          <ModuleTitle moduleId={id!} />
        </Grid.Col>
        <Grid.Col span={6} md={3} order={2} orderMd={3}>
          <div className={'flex justify-end'}>
            <Button component={Link} to={'add-cards'} leftIcon={<IconPlus />}>
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
                <IconX />
              </ActionIcon>
            }
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={1} sm={2} md={3} />
        <Grid.Col span={12} sm={8} md={6}>
          <QueryWrapper
            loadingFallback={
              <Stack>
                <CardSkeletons height={150} />
              </Stack>
            }
          >
            <CardsStack
              params={{ moduleId: id as string, keywords: debounced || undefined, first: 10 }}
            />
          </QueryWrapper>
        </Grid.Col>
        <Grid.Col span={1} sm={2} md={3} />
      </Grid>
      <ScrollToTop />
    </Stack>
  )
}
