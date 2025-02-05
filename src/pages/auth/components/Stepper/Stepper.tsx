import { AUTH_STAGES } from '../../constants/constants'
import { useStage } from '../../contexts'

export const Stepper = () => {
  const stageContext = useStage()
  const AuthStage = AUTH_STAGES[stageContext.currentStage]

  return <AuthStage />
}
