import { IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Menu } from '@mantine/core'
import { NoData, SettingsMenu } from '@shared/ui'
import { ModuleCard, useModulesQuery } from '@entities/module'
import { DeleteModuleMenuItem } from '@features/module/delete-module'
import { RemoveFromFolderMenuItem } from '@features/module/remove-from-folder'
import { RenameModuleMenuItem } from '@features/module/rename-module'

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
              actions={
                <SettingsMenu>
                  <Menu.Item
                    icon={<IconPlus size={14} />}
                    component={Link}
                    to={`${module.id}/add-cards`}
                  >
                    Add cards
                  </Menu.Item>
                  <RenameModuleMenuItem id={module.id} />
                  {module.folderId && <RemoveFromFolderMenuItem id={module.id} />}
                  <DeleteModuleMenuItem id={module.id} />
                </SettingsMenu>
              }
            />
          </Grid.Col>
        )
      })}
    </Grid>
  )
}
