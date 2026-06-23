import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  FONT,
  SPACING,
  RADIUS,
} from '../constants/colors';

import { useCategoryFilter } from '../context/CategoryFilterContext';

export default function StatsScreen({ expenses }) {
  const { selectedCategory } =
    useCategoryFilter();

  const filtered =
    selectedCategory === 'all'
      ? expenses
      : expenses.filter(
          (e) => e.category === selectedCategory
        );

  const total = filtered.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const count = filtered.length;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        Stats
      </Text>

      <Text style={styles.filterLabel}>
        Showing:{' '}
        {selectedCategory === 'all'
          ? 'All categories'
          : selectedCategory}
      </Text>

      <View style={styles.card}>
        <Text style={styles.value}>
          Rs. {total.toLocaleString('en-IN')}
        </Text>

        <Text style={styles.label}>
          Total Spent
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.value}>
          {count}
        </Text>

        <Text style={styles.label}>
          Expenses
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: SPACING.lg,
  },

  title: {
    color: COLORS.text,
    fontSize: FONT.xl,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },

  filterLabel: {
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  value: {
    color: COLORS.primary,
    fontSize: FONT.display,
    fontWeight: '800',
  },

  label: {
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
});