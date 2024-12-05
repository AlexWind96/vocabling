import { IconSchool } from '@tabler/icons-react'
import * as React from 'react'
import { FC } from 'react'
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { useNavigateToNewLearnSession } from '../use-navigate-to-new-learn-session'

interface INavigateToNewLearnSessionActionIcon extends Omit<ActionIconProps, 'onClick'> {
  folderId?: string
  modules?: string[]
}

export const NavigateToNewLearnSessionActionIcon: FC<INavigateToNewLearnSessionActionIcon> = ({
  folderId,
  modules = [],
  ...rest
}) => {
  const { navigateToNewLearnSession } = useNavigateToNewLearnSession({
    params: { folderId, modules },
  })
  return (
    <Tooltip label={'Learn folder modules'}>
      <ActionIcon onClick={navigateToNewLearnSession} {...rest}>
        <IconSchool />
      </ActionIcon>
    </Tooltip>
  )
}
