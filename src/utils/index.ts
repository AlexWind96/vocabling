import { Timestamp } from 'firebase/firestore'
import * as React from 'react'

export const arrayToString = (array: string[]): string => {
  return array.join(', ')
}

export const getDate = (date: Date | Timestamp) => {
  if (date instanceof Timestamp) {
    return date.toDate()
  } else {
    return date
  }
}

export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  })
}
