import { usePostSendMessageMutation } from '@/shared/api'

import { useChatsStore } from '@/shared/store/chats'
import { useMessagesStore } from '@/shared/store/messages'
import { useUserStore } from '@/shared/store/user'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const useChat = () => {
  const user = useUserStore.use.user()
  const params = useParams()
  const chat = useChatsStore.use.entities()[params.id!]
  const addMessage = useMessagesStore.use.add()
  const idsMessagesByChat = useMessagesStore.use.idsMessagesByChats()[params.id!]

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
      addMessage({
        idMessage: response.data.idMessage,
        chatId: chat.chatId,
        sender: user?.phone ?? '',
        timestamp: Date.now(),
        message: data.message
      })
      form.reset()
    }
  }
  return {
    state: { form, messages: idsMessagesByChat, user, chat },
    functions: { onSubmit }
  }
}
