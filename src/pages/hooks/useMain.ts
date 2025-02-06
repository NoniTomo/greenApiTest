import { useDeleteNotificationMutation, useGetReceiveNotificationQuery } from '@/shared/api'
import { useChatsStore } from '@/shared/store/chats'
import { useMessagesStore } from '@/shared/store/messages'
import { useUserStore } from '@/shared/store/user'
import React from 'react'

export const useMain = () => {
  const user = useUserStore.use.user()
  const chatIds = useChatsStore.use.ids()
  const addChat = useChatsStore.use.add()
  const chatEntities = useChatsStore.use.entities()

  const addMessage = useMessagesStore.use.add()
  const addChatInMessage = useMessagesStore.use.addChat()

  const [openNumberModal, setOpenNumberModal] = React.useState(false)
  const [open, setOpen] = React.useState(true)

  const deleteNotificationMutation = useDeleteNotificationMutation()

  const getReceiveNotificationQuery = useGetReceiveNotificationQuery({
    apiTokenInstance: user?.apiTokenInstance ?? '',
    apiUrl: user?.apiUrl ?? '',
    idInstance: user?.idInstance ?? '',
    receiveTimeout: 5
  })

  React.useEffect(() => {
    let isMounted = true

    const fetchNotifications = async () => {
      if (!isMounted) return

      try {
        const response = await getReceiveNotificationQuery.refetch()

        if (response.data?.data?.body?.messageData) {
          if (chatIds.findIndex((id) => id === response.data?.data?.body.senderData.chatId) !== -1) {
            addMessage({
              idMessage: response.data.data.body.idMessage,
              chatId: response.data.data.body.senderData.chatId,
              sender: response.data.data.body.senderData.sender,
              timestamp: response.data.data.body.timestamp,
              message: response.data.data.body.messageData.extendedTextMessageData.text
            })
          } else if (
            chatIds.findIndex((id) => id === response.data?.data?.body.senderData.chatId) === -1
          ) {
            addChat({
              chatId: response.data.data.body.senderData.chatId,
              phone: response.data.data.body.senderData.sender
            })
            addChatInMessage({
              chatId: response.data.data.body.senderData.chatId,
              phone: response.data.data.body.senderData.sender
            })
            addMessage({
              idMessage: response.data.data.body.idMessage,
              chatId: response.data.data.body.senderData.chatId,
              sender: response.data.data.body.senderData.sender,
              timestamp: response.data.data.body.timestamp,
              message: response.data.data.body.messageData.extendedTextMessageData.text
            })
          }
        }
        if (response.data?.data?.receiptId)
          await deleteNotificationMutation.mutateAsync({
            params: {
              apiTokenInstance: user?.apiTokenInstance ?? '',
              apiUrl: user?.apiUrl ?? '',
              idInstance: user?.idInstance ?? '',
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
    state: { open, openNumberModal, chatEntities, chatIds },
    functions: { setOpen, setOpenNumberModal }
  }
}
