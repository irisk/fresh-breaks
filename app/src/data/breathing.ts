export interface BreathingPattern {
  inhale: number
  hold1: number
  exhale: number
  hold2: number
}

export interface BreathingExercise {
  id: string
  name: string
  description: string
  duration: number // seconds
  pattern: BreathingPattern
  instructions: string
}

export const exercises: BreathingExercise[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: "For when you're wired.",
    duration: 240,
    pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    instructions: 'through your nose, slowly',
  },
  {
    id: 'resonance',
    name: 'Resonance',
    description: 'Long, even waves.',
    duration: 180,
    pattern: { inhale: 5, hold1: 0, exhale: 5, hold2: 0 },
    instructions: 'in through the nose, out through the mouth',
  },
  {
    id: 'energize',
    name: 'Energize',
    description: 'Quick lift, no caffeine.',
    duration: 60,
    pattern: { inhale: 2, hold1: 0, exhale: 2, hold2: 0 },
    instructions: 'short and sharp',
  },
]
