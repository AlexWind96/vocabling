import { LEARN_STATUS } from '@/api'

type Progress = 1 | 2 | 3 | 4 | 5

export const getProgressByStatus = (status: LEARN_STATUS): Progress => {
  switch (status) {
    case LEARN_STATUS.NEW:
      return 1
    case LEARN_STATUS.SHOWN:
      return 2
    case LEARN_STATUS.IN_PROGRESS:
      return 3
    case LEARN_STATUS.FAMILIAR:
      return 4
    case LEARN_STATUS.KNOWN:
      return 5
  }
}
