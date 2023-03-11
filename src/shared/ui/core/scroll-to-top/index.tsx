import { IconArrowUp } from '@tabler/icons-react'
import * as React from 'react'
import { ActionIcon, Affix, Transition } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'

type ScrollToTopProps = {}

export const ScrollToTop = ({}: ScrollToTopProps) => {
  const [scroll, scrollTo] = useWindowScroll()
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon
            variant={'filled'}
            color={'primary'}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            <IconArrowUp size={16} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  )
}
