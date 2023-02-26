import * as React from 'react'
import { Alert, Grid, Title } from '@mantine/core'
import { ModuleCard, useModules } from '@/entities/module'
import { DeleteModule } from '@/features/module'
import { LoadingScreen } from '../../shared/ui'

type ModulesGridProps = {}

export const ModulesGrid = ({}: ModulesGridProps) => {
  const { isError, error, isSuccess, data, isInitialLoading } = useModules()
  let content: React.ReactNode = null

  if (isInitialLoading) {
    content = (
      <Grid.Col>
        <LoadingScreen />
      </Grid.Col>
    )
  }
  if (isError) {
    content = (
      <Grid.Col>
        <Alert title={'Error'}>{error.message || 'Error while loading modules'}</Alert>
      </Grid.Col>
    )
  }
  if (isSuccess) {
    if (data.length) {
      content = data.map((module) => {
        return (
          <Grid.Col span={12} xs={6} key={module.id}>
            <ModuleCard data={module} actions={<DeleteModule id={module.id} />} />
          </Grid.Col>
        )
      })
    } else {
      content = (
        <Grid.Col>
          <Title order={2}>No modules</Title>
        </Grid.Col>
      )
    }
  }

  return <>{content}</>
}
