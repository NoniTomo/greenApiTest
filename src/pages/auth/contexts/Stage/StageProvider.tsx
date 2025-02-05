import React from 'react'

import type { Stage } from './StageContext'
import { StageContext } from './StageContext'

export interface StageProviderProps {
  children: React.ReactNode
  defaultStage: { currentStage?: Stage; completedStages?: Stage[] }
}

export const StageProvider = ({
  children,
  defaultStage: {
    currentStage: defaultCurrentStage = 'tokens',
    completedStages: defaultCompletedStages = []
  }
}: StageProviderProps) => {
  const [currentStage, setCurrentStage] = React.useState<Stage>(defaultCurrentStage)
  const [completedStages, setCompletedStages] = React.useState<Stage[]>(defaultCompletedStages)

  const set = (stage: Stage) => {
    setCurrentStage(stage)
    setCompletedStages([...completedStages, currentStage])
  }

  const back = () => {
    const lastStage = completedStages[completedStages.length - 1]
    setCurrentStage(lastStage)
    setCompletedStages(completedStages.slice(0, -1))
  }

  const isStageCompleted = (stage: Stage) => completedStages.includes(stage)

  const value = React.useMemo(
    () => ({
      currentStage,
      completedStages,
      setCurrentStage,
      setCompletedStages,
      set,
      back,
      isStageCompleted
    }),
    [currentStage, completedStages]
  )
  return <StageContext.Provider value={value}>{children}</StageContext.Provider>
}
