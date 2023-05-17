import { Skeleton } from '@mantine/core'

type CardSkeletonsProps = { height?: string | number; width?: string | number; count?: number }

export const CardSkeletons = ({ height = 100, width, count = 3 }: CardSkeletonsProps) => {
  return (
    <>
      {[...Array(count).keys()].map((item) => {
        return <Skeleton height={height} width={width} key={`skeleton-${item}`} />
      })}
    </>
  )
}
