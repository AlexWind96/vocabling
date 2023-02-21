import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'
import { PATH } from '@/shared/config'

type LearnSessionProps = {}

export const LearnSession = ({}: LearnSessionProps) => {
  return (
    <div>
      Learn session
      <Button component={Link} to={`/${PATH.learn_cards}`}>
        Back to cards
      </Button>
    </div>
  )
}
