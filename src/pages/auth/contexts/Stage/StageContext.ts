import React from 'react'

export type Stage = 'tokens' | 'phoneNumber'

export interface StageContextProps {
  currentStage: Stage
  completedStages: Stage[]
  setCurrentStage: (currentStage: Stage) => void
  setCompletedStages: (completedStages: Stage[]) => void
  set: (stage: Stage) => void
  back: () => void
  isStageCompleted: (stage: Stage) => boolean
}

export const StageContext = React.createContext<StageContextProps>({
  currentStage: 'tokens',
  completedStages: [],
  setCurrentStage: () => {},
  setCompletedStages: () => {},
  set: () => {},
  back: () => {},
  isStageCompleted: () => false
})
