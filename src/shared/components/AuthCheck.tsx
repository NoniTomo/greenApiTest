import React from 'react'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '../constants'
import { useChat } from '../contexts'

export interface AuthCheckProps {
  children: React.ReactNode
}

export const AuthCheck = ({ children }: AuthCheckProps) => {
  const chatContext = useChat()
  const userContext = useChat()
  const isAuth = chatContext.value && userContext.value

  if (isAuth) {
    return <>{children}</>
  }

  return <Navigate to={ROUTES.AUTH} />
}
