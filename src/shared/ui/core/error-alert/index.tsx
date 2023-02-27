import { Alert } from '@mantine/core'

type ErrorAlertProps = {
  message: string | undefined
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <Alert bg={'red.1'} color={'red.5'} title={'Error'}>
      {message || 'Sorry! Something went wrong😔'}
    </Alert>
  )
}
