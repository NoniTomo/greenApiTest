import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { useUserStore } from './shared/store/user'

export const App = () => {
  const setUser = useUserStore.use.set()
  const user = JSON.parse(localStorage.getItem('session') ?? '{}')

  if (user) setUser({ user })

  return <RouterProvider router={router} />
}
