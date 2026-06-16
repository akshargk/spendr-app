export const VIBES = {
  impulse: {
    emoji: '🛒',
    label: 'Impulse',
    color: '#F97316',
  },

  'worth-it': {
    emoji: '✨',
    label: 'Worth It',
    color: '#22C55E',
  },

  'needed-this': {
    emoji: '✅',
    label: 'Needed This',
    color: '#3B82F6',
  },

  regret: {
    emoji: '😬',
    label: 'Regret',
    color: '#EF4444',
  },
};

export const getVibe = (key) =>
  VIBES[key] ?? VIBES['needed-this'];