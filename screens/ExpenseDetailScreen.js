import { View, Text, StyleSheet } from 'react-native';

import {
  COLORS,
  FONT,
  SPACING,
  RADIUS,
} from '../constants/colors';

export default function ExpenseDetailScreen({ route }) {
  const expense = route?.params?.expense;

  if (!expense) {
    return (
      <View style={styles.screen}>
        <Text style={styles.empty}>
          No expense selected
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        Expense Detail
      </Text>

      <View style={styles.card}>
        <Text style={styles.amount}>
          Rs. {expense.amount}
        </Text>

        <Text style={styles.detail}>
          Category: {expense.category}
        </Text>

        <Text style={styles.detail}>
          Vibe: {expense.vibe}
        </Text>

        <Text style={styles.detail}>
          Note:{' '}
          {expense.note || 'No note added'}
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
    marginBottom: SPACING.lg,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  amount: {
    color: COLORS.primary,
    fontSize: FONT.display,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },

  detail: {
    color: COLORS.text,
    fontSize: FONT.md,
    marginBottom: SPACING.sm,
  },

  empty: {
    color: COLORS.text,
    fontSize: FONT.md,
  },
});