import { usePostSendMessageMutation } from '@/shared/api'

import { useChatsStore } from '@/shared/store/chats'
import { useUserStore } from '@/shared/store/user'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const useChat = () => {
  const user = useUserStore.use.user()
  const [messages, setMessages] = React.useState<Message[]>([])
  const params = useParams()
  const chat = useChatsStore.use.entities()[params.id!]

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      message: ''
    }
  })

  const postSendMessageMutation = usePostSendMessageMutation()

  const onSubmit = async (data: { message: string }) => {
    if (user && chat) {
      const response = await postSendMessageMutation.mutateAsync({
        params: {
          apiTokenInstance: user?.apiTokenInstance ?? '',
          apiUrl: user?.apiUrl ?? '',
          chatId: chat.chatId,
          idInstance: user?.idInstance ?? '',
          message: data.message
        }
      })
      setMessages((prevMessages) => [
        {
          idMessage: response.data.idMessage,
          chatId: chat.chatId,
          sender: user?.phone ?? '',
          timestamp: Date.now(),
          message: data.message
        },
        ...prevMessages
      ])
      form.reset()
    }
  }

  return {
    state: { form, messages, user, chat },
    functions: { onSubmit }
  }
}
