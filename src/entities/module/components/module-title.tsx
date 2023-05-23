import * as React from 'react'
import { Skeleton, Title, TitleProps } from '@mantine/core'
import { useModuleTitle } from '@entities/module'

type ModuleTitleProps = {
  moduleId: string
} & TitleProps

export const ModuleTitle = ({ moduleId, ...titleProps }: ModuleTitleProps) => {
  const { data, isSuccess, isError } = useModuleTitle({ variables: { id: moduleId } })
  if (isSuccess) {
    return <Title {...titleProps}>{data}</Title>
  }
  if (isError) {
    return <Title color={'red'}>Error[module]</Title>
  }
  return <Skeleton height={44} w={150} />
}
