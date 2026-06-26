import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  COLORS,
  FONT,
  RADIUS,
  SPACING,
} from "../constants/colors";

import { VIBES } from "../constants/vibes";

export default function StatsScreen({ expenses = [] }) {
  const totalSpent = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const totalExpenses = expenses.length;

  const vibeTotals = {};

  expenses.forEach((expense) => {
    const vibe = expense.vibe;

    vibeTotals[vibe] =
      (vibeTotals[vibe] || 0) + Number(expense.amount);
  });

  const highest = Math.max(
    ...Object.values(vibeTotals),
    0
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scroll}
    >
      <Text style={styles.title}>Stats</Text>

      <Text style={styles.subtitle}>
        Your spending breakdown
      </Text>

      <View style={styles.card}>
        <Text style={styles.bigAmount}>
          Rs. {totalSpent.toLocaleString()}
        </Text>

        <Text style={styles.cardLabel}>
          Total Spent
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.bigAmount}>
          {totalExpenses}
        </Text>

        <Text style={styles.cardLabel}>
          Expenses Logged
        </Text>
      </View>

      <Text style={styles.section}>
        Spending by Vibe
      </Text>

      {Object.keys(VIBES).map((key) => {
        const value = vibeTotals[key] || 0;

        const percent =
          highest === 0 ? 0 : value / highest;

        return (
          <View key={key} style={styles.row}>
            <Text style={styles.emoji}>
              {VIBES[key].emoji}
            </Text>

            <View style={styles.barArea}>
              <Text style={styles.vibeName}>
                {VIBES[key].label}
              </Text>

              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: `${percent * 100}%`,
                      backgroundColor:
                        VIBES[key].color,
                    },
                  ]}
                />
              </View>
            </View>

            <Text style={styles.amount}>
              Rs. {value}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  scroll: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  title: {
    color: COLORS.text,
    fontSize: FONT.xxl,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textMuted,
    marginBottom: SPACING.xl,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  bigAmount: {
    color: COLORS.primary,
    fontSize: 42,
    fontWeight: "800",
  },

  cardLabel: {
    color: COLORS.textMuted,
    fontSize: FONT.md,
    marginTop: SPACING.xs,
  },

  section: {
    color: COLORS.text,
    fontSize: FONT.lg,
    fontWeight: "700",
    marginBottom: SPACING.md,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  emoji: {
    fontSize: 26,
    width: 40,
  },

  barArea: {
    flex: 1,
    marginHorizontal: SPACING.sm,
  },

  vibeName: {
    color: COLORS.text,
    marginBottom: 6,
  },

  track: {
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: 6,
  },

  amount: {
    color: COLORS.text,
    fontWeight: "700",
    marginLeft: SPACING.sm,
  },
});