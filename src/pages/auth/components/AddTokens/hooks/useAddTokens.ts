import { useStage } from '../../../contexts'
import { useForm } from 'react-hook-form'
import { useGetStateInstanceMutation, useGetWaInstanceMutation } from '@/shared/api/hooks'
import { useUserStore } from '@/shared/store/user'

export const useAddTokens = () => {
  const stage = useStage()
  const setUser = useUserStore.use.set()
  const user = useUserStore.use.user()

  const getStateInstanceMutation = useGetStateInstanceMutation()
  const getWaInstanceMutation = useGetWaInstanceMutation()

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      apiUrl: user?.apiUrl ?? '',
      idInstance: user?.idInstance ?? '',
      apiTokenInstance: user?.apiTokenInstance ?? ''
    }
  })

  const onSubmit = async (data: Omit<UserData, 'phone'>) => {
    await getStateInstanceMutation.mutateAsync({
      params: {
        apiUrl: data.apiUrl,
        apiTokenInstance: data.apiTokenInstance,
        idInstance: data.idInstance
      }
    })
    const response = await getWaInstanceMutation.mutateAsync({
      params: {
        apiUrl: data.apiUrl,
        apiTokenInstance: data.apiTokenInstance,
        idInstance: data.idInstance
      }
    })
    localStorage.setItem(
      'session',
      JSON.stringify({
        apiTokenInstance: data.apiTokenInstance,
        apiUrl: data.apiUrl,
        idInstance: data.idInstance
      })
    )
    stage.set('phoneNumber')
    setUser({ user: { ...data, phone: response.data.phone } })
  }

  return {
    state: { form, stage },
    functions: { onSubmit }
  }
}
