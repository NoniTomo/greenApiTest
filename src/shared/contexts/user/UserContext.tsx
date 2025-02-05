import React from 'react'

export interface UserContextParams {
  value?: UserData
  set: (user: UserData) => void
}

export const UserContext = React.createContext<UserContextParams>({
  value: undefined,
  set: () => {}
})
