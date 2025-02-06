import React from 'react'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '../constants'
import { useUserStore } from '../store/user'

export interface AuthCheckProps {
  children: React.ReactNode
}

export const AuthCheck = ({ children }: AuthCheckProps) => {
  const user = useUserStore.use.user()

  if (user?.apiTokenInstance) {
    return <>{children}</>
  }

  return <Navigate to={ROUTES.AUTH} />
}
