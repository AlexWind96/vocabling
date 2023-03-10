import * as React from 'react'
import { Grid } from '@mantine/core'
import { ModuleCard, useModules } from '@/entities/module'
import { ModuleSettings } from '@/features/module/module-settings'
import { NoData } from '@/shared/ui'

type ModulesGridProps = {
  folderId: string
}

export const ModulesGrid = ({ folderId }: ModulesGridProps) => {
  const { isSuccess, data } = useModules({
    variables: { folderId },
    suspense: true,
    useErrorBoundary: true,
  })

  if (!isSuccess) return null

  if (!data.length) {
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
