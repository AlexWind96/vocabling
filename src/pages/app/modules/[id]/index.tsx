import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import { Button, Center, Grid, Group, Stack, Text, Title } from '@mantine/core'
import { SimpleCard, useCards } from '@/entities/card'
import { useModule } from '@/entities/module'
import { CardSettings } from '@/features/card'
import { BackAnchor, LoadingScreen, ScrollToTop } from '@/shared/ui'

export const ModulePage = () => {
  const { id } = useParams()
  const { data: module, isLoading: isModuleLoading } = useModule({ id: id! })
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCards({
    params: {
      moduleId: id as string,
      first: 3,
    },
  })

  if (isModuleLoading) return <LoadingScreen />

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
            <Button color={'green'} component={Link} to={'add-cards'} leftIcon={<Plus />}>
              Add cards
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={1} sm={2} md={3} />
        <Grid.Col span={12} sm={8} md={6}>
          <Stack>
            {data &&
              data.pages.map((group) => {
                return group.cards.map((card) => {
                  return (
                    <SimpleCard
                      key={card.id}
                      data={card}
                      rightSection={<CardSettings id={card.id} />}
                    />
                  )
                })
              })}
          </Stack>
        </Grid.Col>
        <Grid.Col span={1} sm={2} md={3} />
        <Grid.Col>
          <Center>
            <Button
              onClick={() => {
                fetchNextPage()
              }}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
            </Button>
          </Center>
        </Grid.Col>
      </Grid>
      <ScrollToTop />
    </>
  )
}
