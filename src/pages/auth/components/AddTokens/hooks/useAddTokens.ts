import { useUser } from '@/shared/contexts'
import { useStage } from '../../../contexts'
import { useForm } from 'react-hook-form'
import { useGetStateInstanceMutation, useGetWaInstanceMutation } from '@/shared/api/hooks'

export const useAddTokens = () => {
  const stage = useStage()
  const userContext = useUser()
  const getStateInstanceMutation = useGetStateInstanceMutation()
  const getWaInstanceMutation = useGetWaInstanceMutation()

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      apiUrl: userContext.value?.apiUrl ?? '',
      idInstance: userContext.value?.idInstance ?? '',
      apiTokenInstance: userContext.value?.apiTokenInstance ?? ''
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
    localStorage.setItem('apiTokenInstance', data.apiTokenInstance)
    localStorage.setItem('apiUrl', data.apiUrl)
    localStorage.setItem('idInstance', data.idInstance)
    localStorage.setItem('phone', `${response.data.phone}@c.us`)
    stage.set('phoneNumber')
    userContext.set({ ...data, phone: `${response.data.phone}@c.us` })
  }

  return {
    state: { form, stage },
    functions: { onSubmit }
  }
}
