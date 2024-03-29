export interface PageInfo {
  hasNextPage: boolean

  hasPreviousPage: boolean

  startCursor?: string

  endCursor?: string
}

export interface Edge<Record> {
  cursor: string
  node: Record
}

export interface Page<Record> {
  edges: Edge<Record>[]

  pageInfo: PageInfo

  totalCount: number
}

export interface ValidationErrors {
  errors?: []
  message?: string
}

export interface PaginationArgs {
  first?: number

  last?: number

  after?: string

  before?: string
}

export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}

export type ServerError = {
  error: string
  message: string
  statusCode: number
}
