import { FC, SVGAttributes } from 'react'

interface IconProps extends SVGAttributes<SVGElement> {
  color?: string
  size?: string | number
}

type Icon = FC<IconProps>

export interface INavbarLink {
  path: string
  roles: string[]
  label: string
  icon: Icon
}
