import { Button } from '@/shared/components'
import { useNavigate } from 'react-router-dom'

export const Error = () => {
  const navigate = useNavigate()
  return (
    <div className="p-5">
      <h1>Error</h1>
      <Button
        className="p-5 w-full rounded-xl bg-green-700 hover:bg-green-800  "
        onClick={() => navigate(0)}
        type="submit"
      >
        Выйти
      </Button>
    </div>
  )
}
