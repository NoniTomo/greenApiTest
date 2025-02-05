import React from 'react'

import { UserContext } from './UserContext'

export interface UserProviderProps {
  children: React.ReactNode
  defaultUser?: UserData
}

export const UserProvider = ({ children, defaultUser = undefined }: UserProviderProps) => {
  const [user, setUser] = React.useState<UserData>(defaultUser!)

  const value = React.useMemo(() => ({ value: user, set: setUser }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
