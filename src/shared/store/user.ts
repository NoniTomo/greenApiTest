import { create } from 'zustand'

import { createSelectors } from './createSelector'

type State = {
  user:
    | {
        apiUrl?: string
        idInstance?: string
        apiTokenInstance?: string
        phone?: string
        sender?: string
      }
    | undefined
}

type Action = {
  set: (user: State) => void
  reset: () => void
}

const useUserStoreBase = create<State & Action>((set) => ({
  user: undefined,
  set: ({ user }: State) => {
    set((state) => ({ ...state, user }))
  },
  reset: () => {
    set(() => ({ user: undefined }))
  }
}))

export const useUserStore = createSelectors(useUserStoreBase)
