import { IconFilter, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionIcon, Grid, Group, Stack, Switch, TextInput, Title } from '@mantine/core'
import { useDebouncedValue, useDisclosure } from '@mantine/hooks'
import { QueryWrapper } from '@shared/lib/react-query'
import { ScrollToTop, Skeletons } from '@shared/ui'
import { FilterCardsDrawer } from '@features/card/filter-cards'
import { CardsStack } from '@widgets/cards-stack'
import { allCardsPageSlice, selectAllCardsPageSlice } from './model'

export const AllCardsPage = () => {
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 400)
  const { limit, expandComments, ...params } = useSelector(selectAllCardsPageSlice)
  const [opened, { close, open }] = useDisclosure(false)
  const dispatch = useDispatch()
  const onSwitchClick = (value: boolean) => {
    dispatch(allCardsPageSlice.actions.setExpandComments(value))
  }
  return (
    <>
      <Stack>
        <Grid align={'center'}>
          <Grid.Col span={6} md={3} order={1} orderMd={1}>
            <Title>All cards</Title>
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
          <Grid.Col span={12} order={3} md={3} orderMd={2}>
            <Group>
              <ActionIcon onClick={open}>
                <IconFilter />
              </ActionIcon>
              <Switch
                label={'Expand comments'}
                checked={expandComments}
                onChange={(event) => onSwitchClick(event.currentTarget.checked)}
              />
            </Group>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={1} sm={2} md={3} />
          <Grid.Col span={12} sm={8} md={6}>
            <QueryWrapper
              loadingFallback={
                <Stack>
                  <Skeletons height={150} />
                </Stack>
              }
            >
              <CardsStack
                params={{ keywords: debounced || undefined, first: 10, ...params }}
                showModules
                limit={limit}
                expandComments={expandComments}
              />
            </QueryWrapper>
          </Grid.Col>
          <Grid.Col span={1} sm={2} md={3} />
        </Grid>
        <ScrollToTop />
      </Stack>
      <FilterCardsDrawer opened={opened} onClose={close} />
    </>
  )
}
