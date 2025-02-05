import { RouterProvider } from 'react-router-dom'

import { ChatProvider, UserProvider } from './shared/contexts'
import { router } from './router'

export const App = () => {
  const apiUrl = localStorage.getItem('apiUrl')
  const idInstance = localStorage.getItem('idInstance')
  const apiTokenInstance = localStorage.getItem('apiTokenInstance')
  const value =
    apiUrl && idInstance && apiTokenInstance ? { apiTokenInstance, apiUrl, idInstance } : undefined
  return (
    <UserProvider defaultUser={value}>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </UserProvider>
  )
}
