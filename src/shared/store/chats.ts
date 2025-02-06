import { create } from 'zustand'

import { createSelectors } from './createSelector'

type State = {
  entities: Record<string, Chat>
  ids: string[]
}

type Action = {
  add: (chat: Chat) => void
}

const useChatsStoreBase = create<State & Action>((set) => ({
  entities: {},
  ids: [],
  add: (chat: Chat) => {
    set((state) => ({
      ...state,
      entities: {
        ...state.entities,
        [chat.chatId]: { ...chat }
      },
      ids: [chat.chatId, ...state.ids]
    }))
  }
}))

export const useChatsStore = createSelectors(useChatsStoreBase)
