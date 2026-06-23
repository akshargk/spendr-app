// 8 realistic fake expenses to develop against.
// Replaced by real user data on Day 5; persisted on Day 10.

export const FAKE_EXPENSES = [
  {
    id: '1',
    amount: 250,
    category: 'food',
    vibe: 'impulse',
    note: 'Midnight Maggi + chips run',
    date: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },

  {
    id: '2',
    amount: 1200,
    category: 'entertainment',
    vibe: 'worth-it',
    note: 'Movie night with the gang',
    date: Date.now() - 1000 * 60 * 60 * 26, // yesterday
  },

  {
    id: '3',
    amount: 89,
    category: 'travel',
    vibe: 'needed-this',
    note: 'Auto to college — was running late',
    date: Date.now() - 1000 * 60 * 60 * 30,
  },

  {
    id: '4',
    amount: 2499,
    category: 'other',
    vibe: 'regret',
    note: 'Mechanical keyboard I never use',
    date: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  },

  {
    id: '5',
    amount: 320,
    category: 'food',
    vibe: 'worth-it',
    note: 'Biryani Friday — zero regrets',
    date: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },

  {
    id: '6',
    amount: 549,
    category: 'entertainment',
    vibe: 'regret',
    note: 'Subscription I forgot to cancel',
    date: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },

  {
    id: '7',
    amount: 150,
    category: 'travel',
    vibe: 'needed-this',
    note: 'Bus pass top-up',
    date: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },

  {
    id: '8',
    amount: 799,
    category: 'food',
    vibe: 'impulse',
    note: 'Saw the cake. Bought the cake.',
    date: Date.now() - 1000 * 60 * 60 * 24 * 6.5,
  },
];