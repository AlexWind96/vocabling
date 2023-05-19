import * as React from 'react'
import { Grid } from '@mantine/core'
import { NoData } from '@shared/ui'
import { ModuleCard, useModulesQuery } from '@entities/module'
import { ModuleSettings } from '@widgets/module-settings'

type ModulesGridProps = {
  folderId: string
  withoutNoDataView?: boolean
}

export const ModulesGrid = ({ folderId, withoutNoDataView }: ModulesGridProps) => {
  const { isSuccess, data } = useModulesQuery({
    variables: { folderId },
    suspense: true,
    useErrorBoundary: true,
  })

  if (!isSuccess) return null

  if (!data.length) {
    if (withoutNoDataView) return null
    return <NoData message={'No modules'} />
  }

  return (
    <Grid>
      {data.map((module) => {
        return (
          <Grid.Col span={12} xs={6} sm={4} key={module.id}>
            <ModuleCard
              key={module.id}
              data={module}
              actions={<ModuleSettings folderId={module.folderId} id={module.id} />}
            />
          </Grid.Col>
        )
      })}
    </Grid>
  )
}
