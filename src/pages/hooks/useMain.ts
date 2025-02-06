import { useDeleteNotificationMutation, useGetReceiveNotificationQuery } from '@/shared/api'
import { useChatsStore } from '@/shared/store/chats'
import { useMessagesStore } from '@/shared/store/messages'
import { useUserStore } from '@/shared/store/user'
import React from 'react'

export const useMain = () => {
  const user = useUserStore.use.user()
  const setUser = useUserStore.use.set()
  const userReset = useUserStore.use.reset()

  const chatIds = useChatsStore.use.ids()
  const addChat = useChatsStore.use.add()
  const chatEntities = useChatsStore.use.entities()
  const chatsReset = useChatsStore.use.reset()

  const addMessage = useMessagesStore.use.add()
  const addChatInMessage = useMessagesStore.use.addChat()
  const messagesReset = useMessagesStore.use.reset()

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

        if (response.data?.data?.body.messageData) {
          const text =
            typeof response.data.data.body.messageData.extendedTextMessageData !== 'undefined'
              ? response.data.data.body.messageData.extendedTextMessageData.text
              : response.data.data.body.messageData.textMessageData.textData
          console.log(text)
          console.log('chatIds', chatIds)
          console.log(
            'response.data?.data?.body.senderData.chatId',
            response.data?.data?.body.senderData.chatId
          )
          if (chatIds.findIndex((id) => id === response.data?.data?.body.senderData.chatId) !== -1) {
            console.log('чат существует', {
              idMessage: response.data.data.body.idMessage,
              chatId: response.data.data.body.senderData.chatId,
              sender: response.data.data.body.senderData.sender,
              timestamp: response.data.data.body.timestamp,
              message: text
            })

            addMessage({
              idMessage: response.data.data.body.idMessage,
              chatId: response.data.data.body.senderData.chatId,
              sender: response.data.data.body.senderData.sender,
              timestamp: response.data.data.body.timestamp,
              message: text
            })
          } else if (
            chatIds.findIndex((id) => id === response.data?.data?.body.senderData.chatId) === -1
          ) {
            console.log('чата нет', {
              idMessage: response.data.data.body.idMessage,
              chatId: response.data.data.body.senderData.chatId,
              sender: response.data.data.body.senderData.sender,
              timestamp: response.data.data.body.timestamp,
              message: text
            })
            addChat({
              chatId: response.data.data.body.senderData.chatId,
              phone: String(parseInt(response.data.data.body.senderData.sender))
            })
            addChatInMessage({
              chatId: response.data.data.body.senderData.chatId,
              phone: String(parseInt(response.data.data.body.senderData.sender))
            })
            addMessage({
              idMessage: response.data.data.body.idMessage,
              chatId: response.data.data.body.senderData.chatId,
              sender: response.data.data.body.senderData.sender,
              timestamp: response.data.data.body.timestamp,
              message: text
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
  }, [chatIds])

  const onLeave = () => {
    localStorage.removeItem('session')
    messagesReset()
    chatsReset()
    userReset()
  }

  return {
    state: { open, openNumberModal, chatEntities, chatIds },
    functions: { setOpen, setOpenNumberModal, setUser, onLeave }
  }
}
