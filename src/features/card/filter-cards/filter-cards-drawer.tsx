import { useDispatch, useSelector } from 'react-redux'
import { Drawer } from '@mantine/core'
import { CardsQueryParams } from '@shared/api'
import { CardFilters, allCardsPageSlice, selectAllCardsPageSlice } from '@pages/app/all-cards/model'
import { FilterCardsForm } from './filter-cards-form/filter-cards-form'

interface FilterCardsDrawerProps {
  opened: boolean
  onClose: () => void
}

export function FilterCardsDrawer({ opened, onClose }: FilterCardsDrawerProps) {
  const params = useSelector(selectAllCardsPageSlice)
  const dispatch = useDispatch()
  const handleSubmit = (params: CardFilters) => {
    dispatch(allCardsPageSlice.actions.patchFilter(params))
    onClose()
  }
  return (
    <Drawer opened={opened} onClose={onClose} position={'right'} title={'Filter cards'}>
      <FilterCardsForm onSubmit={handleSubmit} defaultValues={params} />
    </Drawer>
  )
}
