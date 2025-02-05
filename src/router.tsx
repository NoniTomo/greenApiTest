import { createBrowserRouter } from 'react-router-dom'

import { Auth, Error, Main } from '@/pages'
import { ROUTES } from '@/shared/constants/routes'

import { AuthCheck } from './shared/components'

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <AuthCheck>
        <Main />
      </AuthCheck>
    ),
    errorElement: <Error />
  },
  {
    path: ROUTES.AUTH,
    element: <Auth />,
    errorElement: <Error />
  }
])
