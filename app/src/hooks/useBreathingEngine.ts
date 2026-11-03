import { useState, useRef, useCallback, useEffect } from 'react'
import type { BreathingExercise } from '@/data/breathing'

/**
 * Breathing phase order — one full cycle is:
 * inhale → hold1 → exhale → hold2
 * Phases with 0 duration are automatically skipped.
 */
type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2'

const PHASES: Phase[] = ['inhale', 'hold1', 'exhale', 'hold2']

const PHASE_LABELS: Record<Phase, string> = {
  inhale: 'Inhale',
  hold1: 'Hold',
  exhale: 'Exhale',
  hold2: 'Hold',
}

interface BreathingState {
  isRunning: boolean
  elapsed: number
  phaseIndex: number
  phaseElapsed: number
  isComplete: boolean
}

/**
 * Returns the first valid phase index (one with duration > 0).
 * In practice, inhale is always > 0, so this returns 0.
 */
function firstValidPhase(exercise: BreathingExercise): number {
  for (let i = 0; i < PHASES.length; i++) {
    if (exercise.pattern[PHASES[i]] > 0) return i
  }
  return 0
}

/**
 * Advances to the next phase, skipping any with 0 duration.
 */
function nextPhaseIndex(current: number, exercise: BreathingExercise): number {
  let next = (current + 1) % PHASES.length
  // Safety: loop at most 4 times to avoid infinite loop
  let safety = 0
  while (exercise.pattern[PHASES[next]] === 0 && safety < 4) {
    next = (next + 1) % PHASES.length
    safety++
  }
  return next
}

export function useBreathingEngine(exercise: BreathingExercise) {
  const initialPhase = firstValidPhase(exercise)

  const [state, setState] = useState<BreathingState>({
    isRunning: false,
    elapsed: 0,
    phaseIndex: initialPhase,
    phaseElapsed: 0,
    isComplete: false,
  })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Derived values
  const currentPhase = PHASES[state.phaseIndex]
  const phaseDuration = exercise.pattern[currentPhase]
  const phaseCountdown = phaseDuration - state.phaseElapsed
  const totalRemaining = exercise.duration - state.elapsed
  const progress = state.elapsed / exercise.duration

  // Whether the user has started at least once (controls circle resting state)
  const hasStarted = state.elapsed > 0 || state.isRunning

  // Tick function: advances 1 second
  const tick = useCallback(() => {
    setState(prev => {
      const newElapsed = prev.elapsed + 1
      let newPhaseElapsed = prev.phaseElapsed + 1
      let newPhaseIndex = prev.phaseIndex

      // Check if current phase is complete
      const currentPhaseName = PHASES[newPhaseIndex]
      if (newPhaseElapsed >= exercise.pattern[currentPhaseName]) {
        newPhaseElapsed = 0
        newPhaseIndex = nextPhaseIndex(newPhaseIndex, exercise)
      }

      const isComplete = newElapsed >= exercise.duration

      return {
        isRunning: isComplete ? false : prev.isRunning,
        elapsed: newElapsed,
        phaseIndex: newPhaseIndex,
        phaseElapsed: newPhaseElapsed,
        isComplete,
      }
    })
  }, [exercise])

  // Manage the interval based on isRunning
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(tick, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [state.isRunning, tick])

  const toggle = useCallback(() => {
    if (state.isComplete) return
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }, [state.isComplete])

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState({
      isRunning: false,
      elapsed: 0,
      phaseIndex: firstValidPhase(exercise),
      phaseElapsed: 0,
      isComplete: false,
    })
  }, [exercise])

  return {
    isRunning: state.isRunning,
    isComplete: state.isComplete,
    elapsed: state.elapsed,
    currentPhase,
    phaseLabel: PHASE_LABELS[currentPhase],
    phaseCountdown,
    totalRemaining,
    progress,
    hasStarted,
    toggle,
    reset,
  }
}
