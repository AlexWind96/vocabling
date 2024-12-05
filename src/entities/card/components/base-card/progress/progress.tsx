import * as React from 'react'
import { Group } from '@mantine/core'
import { LEARN_STATUS } from '@shared/api'

type ProgressProps = {
  status: LEARN_STATUS
}

export const Progress = ({ status }: ProgressProps) => {
  switch (status) {
    case 'NEW': {
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
    case 'SHOWN': {
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
    case 'IN_PROGRESS': {
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
    case 'FAMILIAR': {
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
    case 'KNOWN': {
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
      return null
    }
  }
}
