import { useSelector } from 'react-redux'
import { auth } from '..'

export const useAuth = () => {
  return useSelector(auth.model.selectors.selectAuthState)
}
