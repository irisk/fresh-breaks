export interface Reflection {
  text: string
  timeOfDay: ('morning' | 'afternoon' | 'evening')[]
}

export const reflections: Reflection[] = [
  // Morning prompts
  {
    text: "What's one thing you're looking forward to today?",
    timeOfDay: ['morning'],
  },
  {
    text: 'What would make today feel like a good day?',
    timeOfDay: ['morning'],
  },
  {
    text: "What's one kind thing you could do for yourself today?",
    timeOfDay: ['morning'],
  },
  {
    text: 'If today had a theme, what would you want it to be?',
    timeOfDay: ['morning'],
  },
  {
    text: "What's something you're curious about right now?",
    timeOfDay: ['morning'],
  },
  {
    text: "What's one thing you'd like to be more present for today?",
    timeOfDay: ['morning'],
  },
  {
    text: 'If you could protect one hour today just for yourself, what would you do with it?',
    timeOfDay: ['morning'],
  },
  {
    text: "What's something you've been putting off that might actually feel good to start?",
    timeOfDay: ['morning'],
  },

  // Afternoon prompts
  {
    text: "What's one thing that went well today that you didn't plan?",
    timeOfDay: ['afternoon'],
  },
  {
    text: 'If you could tell your morning self one thing, what would it be?',
    timeOfDay: ['afternoon'],
  },
  {
    text: "What would you do right now if you weren't worried about anything?",
    timeOfDay: ['afternoon'],
  },
  {
    text: 'What would make this moment 10% better?',
    timeOfDay: ['afternoon'],
  },
  {
    text: "What's a strength you used today without thinking about it?",
    timeOfDay: ['afternoon'],
  },
  {
    text: 'What surprised you today?',
    timeOfDay: ['afternoon'],
  },
  {
    text: "What's one thing you did today that you're quietly proud of?",
    timeOfDay: ['afternoon'],
  },
  {
    text: 'When did you feel most like yourself today?',
    timeOfDay: ['afternoon'],
  },
  {
    text: "What's a small decision you made today that turned out well?",
    timeOfDay: ['afternoon'],
  },

  // Evening prompts
  {
    text: 'Who made you smile today?',
    timeOfDay: ['evening'],
  },
  {
    text: "What's something small that you're grateful for right now?",
    timeOfDay: ['evening'],
  },
  {
    text: "What's one thing you can let go of from today?",
    timeOfDay: ['evening'],
  },
  {
    text: 'What did you learn about yourself today?',
    timeOfDay: ['evening'],
  },
  {
    text: "What's one thing you're grateful for that you usually take for granted?",
    timeOfDay: ['evening'],
  },
  {
    text: "What's one conversation from today that stayed with you?",
    timeOfDay: ['evening'],
  },
  {
    text: "What's something you noticed today that you usually overlook?",
    timeOfDay: ['evening'],
  },
  {
    text: 'If you could relive one moment from today, which would it be?',
    timeOfDay: ['evening'],
  },
  {
    text: "What did today teach you that yesterday didn't?",
    timeOfDay: ['evening'],
  },

  // Any time
  {
    text: "What's something small that you're looking forward to?",
    timeOfDay: ['morning', 'afternoon', 'evening'],
  },
  {
    text: "What's a recent moment that felt really good?",
    timeOfDay: ['morning', 'afternoon', 'evening'],
  },
  {
    text: 'What matters most to you right now?',
    timeOfDay: ['morning', 'afternoon', 'evening'],
  },
  {
    text: "What's something you're better at now than you were a year ago?",
    timeOfDay: ['morning', 'afternoon', 'evening'],
  },
  {
    text: "What does 'enough' look like for you right now?",
    timeOfDay: ['morning', 'afternoon', 'evening'],
  },
  {
    text: "What's a boundary you're glad you set?",
    timeOfDay: ['morning', 'afternoon', 'evening'],
  },
  {
    text: 'Where in your body do you feel the most relaxed right now?',
    timeOfDay: ['morning', 'afternoon', 'evening'],
  },
]

export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

export function getTimeLabel(time: 'morning' | 'afternoon' | 'evening'): string {
  const icons = { morning: '☀', afternoon: '☀', evening: '☽' }
  return `${icons[time]} ${time.charAt(0).toUpperCase() + time.slice(1)} prompt`
}

export function getFilteredReflections(time: 'morning' | 'afternoon' | 'evening'): Reflection[] {
  return reflections.filter((r) => r.timeOfDay.includes(time))
}
