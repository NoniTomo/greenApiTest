import { Stepper } from './components/Stepper/Stepper'
import { StageProvider } from './contexts/Stage'

export const Auth = () => {
  return (
    <StageProvider
      defaultStage={{
        currentStage: 'tokens',
        completedStages: []
      }}
    >
      <section className="flex h-screen w-screen items-center justify-center bg-[#1a2329] text-background">
        <div className="max-w-[400px]">
          <Stepper />
        </div>
      </section>
    </StageProvider>
  )
}
