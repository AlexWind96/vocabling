import * as React from 'react'
import { Skeleton, Title, TitleProps } from '@mantine/core'
import { useModule } from '@/entities/module'

type ModuleTitleProps = {
  moduleId: string
} & TitleProps

export const ModuleTitle = (props: ModuleTitleProps) => {
  const { data: module, isSuccess, isError } = useModule({ id: props.moduleId })
  if (isSuccess) {
    return <Title {...props}>{module.label}</Title>
  }
  if (isError) {
    return <Title color={'red'}>Error[module]</Title>
  }
  return <Skeleton height={44} w={150} />
}
