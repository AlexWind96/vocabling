import * as React from 'react'
import { Grid } from '@mantine/core'
import { ModuleCard, useModules } from '@/entities/module'
import { DeleteModule } from '@/features/module'
import { ErrorAlert, LoadingData, NoData } from '@/shared/ui'

type ModulesGridProps = {}

export const ModulesGrid = ({}: ModulesGridProps) => {
  const { isError, error, isSuccess, data } = useModules()

  if (isSuccess) {
    if (!data.length) {
      return <NoData message={'No modules'} />
    }
    return (
      <Grid>
        {data.map((module) => {
          return (
            <Grid.Col span={12} xs={6} key={module.id}>
              <ModuleCard data={module} actions={<DeleteModule id={module.id} />} />
            </Grid.Col>
          )
        })}
      </Grid>
    )
  }

  if (isError) {
    return <ErrorAlert message={error?.message} />
  }

  return <LoadingData />
}
