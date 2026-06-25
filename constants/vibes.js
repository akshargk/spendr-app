// Single source of truth for the four Spendr vibes.
// Every screen imports from here — never hardcode a vibe emoji again.

export const VIBES = {
  'impulse': {
    emoji: '🔥',
    label: 'Impulse',
    color: '#F97316', // orange
    description: 'Spur-of-the-moment buy',
  },

  'worth-it': {
    emoji: '✨',
    label: 'Worth It',
    color: '#22C55E', // green
    description: 'Joy purchase — would do again',
  },

  'needed-this': {
    emoji: '✅',
    label: 'Needed This',
    color: '#3B82F6', // blue
    description: 'Essential — no regrets',
  },

  'regret': {
    emoji: '😬',
    label: 'Regret',
    color: '#EF4444', // red
    description: 'Wish I had not bought it',
  },
};

// Helper — safe lookup with a fallback so a typo never crashes the app
export const getVibe = (key) => VIBES[key] ?? VIBES['needed-this'];
