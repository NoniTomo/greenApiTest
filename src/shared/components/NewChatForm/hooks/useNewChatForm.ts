import React from 'react'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { Countries } from '../types/types'
import { useChatsStore } from '@/shared/store/chats'
import { useMessagesStore } from '@/shared/store/messages'

export interface UseNewChatFormProps {
  onSubmitAction: ({ phone }: { phone: string }) => void
}

export function useNewChatForm({ onSubmitAction }: UseNewChatFormProps) {
  const addChat = useChatsStore.use.add()
  const addChatInMessagesStore = useMessagesStore.use.addChat()

  const [countryValue, setCountryValue] = React.useState<Countries>('ru')

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      phone: ''
    }
  })

  const onSubmit = (data: { phone: string }) => {
    const phone = data.phone
      .split('')
      .filter((char) => char !== ' ' && char !== '+')
      .join('')

    addChat({ phone, chatId: `${phone}@c.us` })
    addChatInMessagesStore({ phone, chatId: `${phone}@c.us` })

    onSubmitAction({ phone })
  }

  const registerWithMask = useHookFormMask(form.register)

  return {
    state: { form: { ...form, register: registerWithMask }, countryValue },
    functions: { onSubmit, setCountryValue }
  }
}
