import { createBrowserRouter } from 'react-router-dom'

import { Auth, Error, Main } from '@/pages'
import { Chat } from './pages/chat/[id]/Chat.page'

import { ROUTES } from '@/shared/constants/routes'
import { AuthCheck } from './shared/components'
import { useChatsStore } from './shared/store/chats'
import { useMessagesStore } from './shared/store/messages'

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <AuthCheck>
        <Main />
      </AuthCheck>
    ),
    errorElement: <Error />,
    children: [
      {
        loader: ({ params }) => {
          const entities = useChatsStore.getState().entities
          const addChat = useChatsStore.getState().add
          const addChatToMessagesStore = useMessagesStore.getState().addChat
          if (!entities[params.id!]) {
            const chat = {
              chatId: params.id as string,
              phone: String(parseInt(params.id!))
            }
            addChat(chat)
            addChatToMessagesStore(chat)
          }

          return null
        },
        path: ROUTES.CHAT_ID,
        element: <Chat />,
        errorElement: <Error />
      }
    ]
  },
  {
    path: ROUTES.AUTH,
    element: <Auth />,
    errorElement: <Error />
  }
])
