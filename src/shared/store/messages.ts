import { create } from 'zustand'

import { createSelectors } from './createSelector'

type State = {
  entities: Record<string, Message>
  idsMessagesByChats: Record<string, Message[]>
}

type Action = {
  add: (message: Message) => void
  addChat: (chat: Chat) => void
  reset: () => void
}

const useMessagesStoreBase = create<State & Action>((set) => ({
  entities: {},
  idsMessagesByChats: {},
  add: (message: Message) => {
    set((state) => ({
      ...state,
      entities: {
        ...state.entities,
        [message.idMessage]: { ...message }
      },
      idsMessagesByChats: {
        ...state.idsMessagesByChats,
        [message.chatId]: [...state.idsMessagesByChats[message.chatId], message]
      }
    }))
  },
  addChat: (chat: Chat) => {
    set((state) => ({
      ...state,
      idsMessagesByChats: {
        ...state.idsMessagesByChats,
        [chat.chatId]: []
      }
    }))
  },
  reset: () => {
    set(() => ({ entities: {}, idsMessagesByChats: {} }))
  }
}))

export const useMessagesStore = createSelectors(useMessagesStoreBase)
