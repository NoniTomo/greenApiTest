import React from 'react'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/shared/constants'
import { useUserStore } from '@/shared/store'

export interface AuthCheckProps {
  children: React.ReactNode
}

export const AuthCheck = ({ children }: AuthCheckProps) => {
  const user = useUserStore.use.user()

  if (user?.apiTokenInstance && user?.apiUrl && user?.idInstance && user?.phone) {
    return <>{children}</>
  }

  return <Navigate to={ROUTES.AUTH} />
}
