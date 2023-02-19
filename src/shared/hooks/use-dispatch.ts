import { useDispatch } from 'react-redux'

export type AppDispatch = typeof window.store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
