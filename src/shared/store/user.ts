import { create } from 'zustand'

import { createSelectors } from './createSelector'

type State = {
  user:
    | {
        apiUrl?: string
        idInstance?: string
        apiTokenInstance?: string
        phone?: string
      }
    | undefined
}

type Action = {
  set: (user: State) => void
}

const useUserStoreBase = create<State & Action>((set) => ({
  user: undefined,
  set: ({ user }: State) => {
    set((state) => ({ ...state, user }))
  }
}))

export const useUserStore = createSelectors(useUserStoreBase)
