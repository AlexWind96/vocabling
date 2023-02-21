import * as React from 'react'
import { Group } from '@mantine/core'

type ProgressProps = {
  progress: number
}

export const Progress = ({ progress }: ProgressProps) => {
  switch (progress) {
    case 1: {
      return (
        <Group spacing={4}>
          <div className={'h-1 rounded w-4 bg-orange-500'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
        </Group>
      )
    }
    case 2: {
      return (
        <Group spacing={4}>
          <div className={'h-1 rounded w-4 bg-pink-500'} />
          <div className={'h-1 rounded w-4 bg-pink-500'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
        </Group>
      )
    }
    case 3: {
      return (
        <Group spacing={4}>
          <div className={'h-1 rounded w-4 bg-purple-500'} />
          <div className={'h-1 rounded w-4 bg-purple-500'} />
          <div className={'h-1 rounded w-4 bg-purple-500'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
        </Group>
      )
    }
    case 4: {
      return (
        <Group spacing={4}>
          <div className={'h-1 rounded w-4 bg-indigo-400'} />
          <div className={'h-1 rounded w-4 bg-indigo-400'} />
          <div className={'h-1 rounded w-4 bg-indigo-400'} />
          <div className={'h-1 rounded w-4 bg-indigo-400'} />
          <div className={'h-1 rounded w-4 bg-slate-300'} />
        </Group>
      )
    }
    case 5: {
      return (
        <Group spacing={4}>
          <div className={'h-1 rounded w-4 bg-emerald-500'} />
          <div className={'h-1 rounded w-4 bg-emerald-500'} />
          <div className={'h-1 rounded w-4 bg-emerald-500'} />
          <div className={'h-1 rounded w-4 bg-emerald-500'} />
          <div className={'h-1 rounded w-4 bg-emerald-500'} />
        </Group>
      )
    }
    default: {
      return (
        <Group spacing={4}>
          <div className={'h-1 rounded w-4 bg-slate-slate'} />
          <div className={'h-1 rounded w-4 bg-slate-slate'} />
          <div className={'h-1 rounded w-4 bg-slate-slate'} />
          <div className={'h-1 rounded w-4 bg-slate-slate'} />
          <div className={'h-1 rounded w-4 bg-slate-slate'} />
        </Group>
      )
    }
  }
}
