import { Button } from '@/shared/components/ui/button'
import { useStage } from '../../contexts'
import { NewChatForm } from '@/shared/components'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'

export const AddPhoneNumber = () => {
  const stage = useStage()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-3">
      <NewChatForm
        onSubmitAction={() => {
          navigate(ROUTES.ROOT)
        }}
      />
      <Button
        className="p-5 w-full rounded-xl bg-green-700 hover:bg-green-800"
        onClick={() => stage.set('tokens')}
        type="submit"
      >
        Назад
      </Button>
    </div>
  )
}
