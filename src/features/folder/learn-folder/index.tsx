import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { useUpdateCurrentLearnSession } from '../../current-learn-session/update-current-learn-session'

type LearnFolderProps = {
  id: string
} & ActionIconProps

export const LearnFolder = ({ id, ...actionIconProps }: LearnFolderProps) => {
  const { mutateAsync } = useUpdateCurrentLearnSession()
  const navigate = useNavigate()
  const handleClick = async () => {
    const currentLearnSession = await mutateAsync({ folderId: id, modules: [] })
    navigate(`/learn-cards/${currentLearnSession.id}`)
  }
  return <ActionIcon onClick={handleClick} {...actionIconProps} />
}
