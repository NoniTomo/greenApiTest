import React from 'react'

import { ChatContext } from './ChatContext'

export interface ChatProviderProps {
  children: React.ReactNode
  defaultChat?: { phone: string }
}

export const ChatProvider = ({ children, defaultChat = undefined }: ChatProviderProps) => {
  const [chat, setChat] = React.useState<{ phone: string }>(defaultChat!)

  const value = React.useMemo(() => ({ value: chat, set: setChat }), [chat])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
