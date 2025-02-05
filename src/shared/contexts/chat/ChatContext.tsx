import React from 'react'

export interface ChatContextParams {
  value?: {phone: string}
  set: ({phone}:{phone: string}) => void
}

export const ChatContext = React.createContext<ChatContextParams>({
  value: undefined,
  set: () => {}
})
