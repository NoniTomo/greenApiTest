import {
  useDeleteNotificationMutation,
  useGetReceiveNotificationQuery,
  usePostSendMessageMutation
} from '@/shared/api'

import { useChat, useUser } from '@/shared/contexts'
import React from 'react'
import { useForm } from 'react-hook-form'

export const useChatComponent = () => {
  const userContext = useUser()
  const chatContext = useChat()
  const [messages, setMessages] = React.useState<
    {
      idMessage: string
      chatId: string
      sender: string
      timestamp: number
      message: string
    }[]
  >([])

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      message: ''
    }
  })

  const postSendMessageMutation = usePostSendMessageMutation()
  const deleteNotificationMutation = useDeleteNotificationMutation()

  const getReceiveNotificationQuery = useGetReceiveNotificationQuery({
    apiTokenInstance: (userContext.value as UserData).apiTokenInstance,
    apiUrl: (userContext.value as UserData).apiUrl,
    idInstance: (userContext.value as UserData).idInstance,
    receiveTimeout: 5
  })

  const onSubmit = async (data: { message: string }) => {
    if (userContext.value && chatContext.value) {
      const response = await postSendMessageMutation.mutateAsync({
        params: {
          apiTokenInstance: userContext.value.apiTokenInstance,
          apiUrl: userContext.value.apiUrl,
          chatId: chatContext.value.phone,
          idInstance: userContext.value.idInstance,
          message: data.message
        }
      })
      setMessages((prevMessages) => [
        {
          idMessage: response.data.idMessage,
          chatId: (chatContext.value as { phone: string }).phone,
          sender: (userContext.value as { phone: string }).phone,
          timestamp: Date.now(),
          message: data.message
        },
        ...prevMessages
      ])
    }
  }

  React.useEffect(() => {
    let isMounted = true

    const fetchNotifications = async () => {
      if (!isMounted) return

      try {
        const response = await getReceiveNotificationQuery.refetch()

        if (response.data?.data?.body?.messageData) {
          setMessages((prevMessages) => [
            {
              idMessage: response.data.data.body.idMessage,
              chatId: response.data.data.body.senderData.chatId,
              sender: response.data.data.body.senderData.sender,
              timestamp: response.data.data.body.timestamp,
              message: response.data.data.body.messageData.extendedTextMessageData.text
            },
            ...prevMessages
          ])
        }
        if (response.data?.data?.receiptId)
          await deleteNotificationMutation.mutateAsync({
            params: {
              apiTokenInstance: (userContext.value as UserData).apiTokenInstance,
              apiUrl: (userContext.value as UserData).apiUrl,
              idInstance: (userContext.value as UserData).idInstance,
              receiptId: response.data.data.receiptId
            }
          })
      } catch (error) {
        console.error('Ошибка при получении уведомления:', error)
      }

      setTimeout(fetchNotifications, 2000)
    }

    fetchNotifications()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    state: { form, messages, userContext, chatContext },
    functions: { onSubmit }
  }
}
