export interface Question {
  text: string
  category: 'curiosity' | 'positive' | 'memory' | 'creative' | 'values'
}

export const questions: Question[] = [
  // Curiosity builders
  {
    text: "What's something you changed your mind about recently?",
    category: 'curiosity',
  },
  {
    text: "What's something you learned recently that surprised you?",
    category: 'curiosity',
  },
  {
    text: "What's a topic you could talk about for hours?",
    category: 'curiosity',
  },
  {
    text: "What's a question you wish people asked you more often?",
    category: 'curiosity',
  },
  {
    text: "What's a skill you admire in someone but have no desire to learn yourself?",
    category: 'curiosity',
  },
  {
    text: "What's something everyone seems to agree on that you're not so sure about?",
    category: 'curiosity',
  },
  {
    text: "What's the most interesting thing you've read or watched recently?",
    category: 'curiosity',
  },

  // Positive focus
  {
    text: "What's the best thing that happened to you this week?",
    category: 'positive',
  },
  {
    text: "What's something that always makes you laugh?",
    category: 'positive',
  },
  {
    text: "What's a compliment you received that you still think about?",
    category: 'positive',
  },
  {
    text: "What's a random act of kindness someone did for you that you still remember?",
    category: 'positive',
  },
  {
    text: "What's something about your daily routine that you genuinely enjoy?",
    category: 'positive',
  },
  {
    text: 'When was the last time you laughed really hard?',
    category: 'positive',
  },

  // Memory sharing
  {
    text: "What's a meal you'll never forget?",
    category: 'memory',
  },
  {
    text: "What's a small moment from your childhood that still makes you smile?",
    category: 'memory',
  },
  {
    text: "What's the best trip you've ever taken?",
    category: 'memory',
  },
  {
    text: "What's a sound or smell that instantly takes you somewhere?",
    category: 'memory',
  },
  {
    text: "What's a tradition from your family that you'd want to keep alive?",
    category: 'memory',
  },
  {
    text: "What's the most beautiful place you've ever been?",
    category: 'memory',
  },
  {
    text: "What's a song that instantly takes you back to a specific time in your life?",
    category: 'memory',
  },

  // Creative thinking
  {
    text: 'If you could learn any skill overnight, what would it be?',
    category: 'creative',
  },
  {
    text: 'If you could have dinner with anyone, past or present, who would it be?',
    category: 'creative',
  },
  {
    text: "What's a dream you haven't told many people about?",
    category: 'creative',
  },
  {
    text: 'If you could have any job for just one week, what would you try?',
    category: 'creative',
  },
  {
    text: 'If you could instantly become fluent in any language, which would you choose?',
    category: 'creative',
  },
  {
    text: 'What would you do differently if you knew nobody was watching?',
    category: 'creative',
  },

  // Values exploration
  {
    text: "What's a small thing that matters more to you than most people realize?",
    category: 'values',
  },
  {
    text: "What's a place that always makes you feel calm?",
    category: 'values',
  },
  {
    text: 'What do you think makes a good friendship?',
    category: 'values',
  },
  {
    text: "What's something you believe that most people around you don't?",
    category: 'values',
  },
  {
    text: "What's something you wish you'd been taught earlier in life?",
    category: 'values',
  },
  {
    text: "What's a quality in others that you find yourself drawn to?",
    category: 'values',
  },
  {
    text: 'What does a good day look like for you?',
    category: 'values',
  },
]
