import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../constants/colors";

export default function BudgetCard({ monthlyBudget, spent }) {
  const budget = Number(monthlyBudget) || 0;
  const spentAmount = Number(spent) || 0;

  const percentage =
    budget > 0
      ? Math.min(100, Math.round((spentAmount / budget) * 100))
      : 0;

  const remaining = Math.max(0, budget - spentAmount);

  const formatINR = (value) =>
    "Rs. " +
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

  return (
    <View style={styles.card}>
      <Text style={styles.label}>MONTHLY BUDGET</Text>

      <Text style={styles.amount}>
        {formatINR(budget)}
      </Text>

      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.meta}>
          Spent {formatINR(spentAmount)} ({percentage}%)
        </Text>

        <Text style={styles.meta}>
          {formatINR(remaining)} left
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },

  label: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    fontWeight: "700",
  },

  amount: {
    color: COLORS.text,
    fontSize: FONT.xxl,
    fontWeight: "800",
    marginTop: 4,
  },

  barBg: {
    height: 8,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 4,
    marginTop: SPACING.md,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
  },

  meta: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
  },
});