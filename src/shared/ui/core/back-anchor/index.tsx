import { IconArrowLeft } from '@tabler/icons-react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Anchor, AnchorProps, Group } from '@mantine/core'


type BackAnchorProps = AnchorProps

export const BackAnchor = (props: BackAnchorProps) => {
  const navigate = useNavigate()
  return (
    <Anchor {...props} component="button" type={'button'} onClick={() => navigate(-1)}>
      <Group spacing={5}>
        <IconArrowLeft size={15} />
        <div>{props.children}</div>
      </Group>
    </Anchor>
  )
}
