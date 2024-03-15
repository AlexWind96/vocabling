import { CardFilters } from '@pages/app/all-cards/model'
import { FilterCardsFormValues } from './filter-cards-form'

export const getInitialFilterCardsValues = (query: CardFilters): FilterCardsFormValues => {
  return {
    moduleId: query.moduleId || null,
    limit: query.limit || 50,
    step: String(query.step) || null,
    sort: query.sort || null,
    orderBy: query.orderBy || null,
  }
}
