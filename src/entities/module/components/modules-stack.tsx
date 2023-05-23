import * as React from 'react'
import { Stack } from '@mantine/core'
import { Module } from '@shared/api'
import { NoData } from '@shared/ui'
import { ModuleCard, useModulesQuery } from '@entities/module'

type UpdateFolderProps = {
  folderId?: string
  moduleCardActions: (module: Module) => React.ReactNode
}

export const ModulesStack = ({ folderId, moduleCardActions }: UpdateFolderProps) => {
  const { data, isSuccess } = useModulesQuery({
    variables: { folderId: folderId },
    suspense: true,
    useErrorBoundary: true,
  })
  if (!isSuccess) return null

  if (!data.length) {
    return <NoData message={'No modules'} />
  }
  return (
    <Stack spacing={'xs'} px={20} pb={10}>
      {data.map((module) => {
        return <ModuleCard key={module.id} data={module} actions={moduleCardActions(module)} />
      })}
    </Stack>
  )
}
