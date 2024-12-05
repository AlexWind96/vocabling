import { UpdateUserDto } from '@shared/api'
import { useUserQuery } from '@entities/user'
import { EditAccountForm } from './edit-account-form'
import { useEditAccountMutation } from './use-edit-account-mutation'

export const EditAccountFormContainer = () => {
  const { mutateAsync } = useEditAccountMutation()
  const { data, isLoading } = useUserQuery()
  const handleSubmit = async (data: UpdateUserDto) => {
    await mutateAsync(data)
  }
  if (isLoading) return <div>Loading</div>
  if (!data) return <div>No data</div>
  return <EditAccountForm onSubmit={handleSubmit} defaultValues={data} />
}
