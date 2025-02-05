import { ROUTES } from '@/shared/constants'
import { useUser } from '@/shared/contexts'
import { useChat } from '@/shared/contexts/chat/useChat'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useHookFormMask } from 'use-mask-input'
import { Countries } from '../types/types'

export function useAddPhoneNumber() {
  const appContext = useChat()
  const userContext = useUser()
  const navigate = useNavigate()

  const [countryValue, setCountryValue] = React.useState<Countries>('ru')

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      phone: ''
    }
  })

  const onSubmit = (data: { phone: string }) => {
    const phone = `${data.phone
      .split('')
      .filter((char) => char !== ' ' && char !== '+')
      .join('')}@c.us`
    appContext.set({ phone })

    if (userContext.value) {
      localStorage.setItem('phone', phone)
      navigate(ROUTES.ROOT)
    }
  }

  const registerWithMask = useHookFormMask(form.register)

  return {
    state: { form: { ...form, register: registerWithMask }, countryValue },
    functions: { onSubmit, setCountryValue }
  }
}
