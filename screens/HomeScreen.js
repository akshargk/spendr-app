import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  FONT,
  RADIUS,
  SPACING,
} from "../constants/colors";

import ExpenseCard from "../components/ExpenseCard";
import MoneyFactBanner from "../components/MoneyFactBanner";
import { useCategoryFilter } from "../context/CategoryFilterContext";

const formatINR = (n) =>
  "Rs. " +
  Number(n).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "food", label: "Food" },
  { key: "travel", label: "Travel" },
  { key: "entertainment", label: "Entertainment" },
  { key: "other", label: "Other" },
];

export default function HomeScreen({
  expenses,
  navigation,
}) {
  const { selectedCategory, setSelectedCategory } =
    useCategoryFilter();

  const filtered =
    selectedCategory === "all"
      ? expenses
      : expenses.filter(
          (e) => e.category === selectedCategory
        );

  const total = filtered.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            onPress={() =>
              navigation.navigate("Detail", {
                expense: item,
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Day 8 Banner */}
            <MoneyFactBanner />

            {/* Existing Header */}
            <View style={styles.header}>
              <Text style={styles.headerLabel}>
                THIS WEEK
              </Text>

              <Text style={styles.headerTotal}>
                {formatINR(total)}
              </Text>

              <Text style={styles.headerSub}>
                {filtered.length} expenses logged
              </Text>
            </View>

            {/* Day 9 — Category Filter Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipScroll}
              contentContainerStyle={styles.chipRow}
            >
              {CATEGORIES.map((cat) => {
                const isActive =
                  selectedCategory === cat.key;
                return (
                  <Pressable
                    key={cat.key}
                    onPress={() =>
                      setSelectedCategory(cat.key)
                    }
                    style={[
                      styles.chip,
                      isActive && styles.chipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isActive && styles.chipTextActive,
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>
              📭
            </Text>

            <Text style={styles.emptyText}>
              {selectedCategory === "all"
                ? "No expenses yet — tap + to add one"
                : `No ${selectedCategory} expenses yet`}
            </Text>
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  listContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  header: {
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.md,
  },

  headerLabel: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 1,
  },

  headerTotal: {
    color: COLORS.text,
    fontSize: FONT.display,
    fontWeight: "800",
    marginTop: SPACING.xs,
  },

  headerSub: {
    color: COLORS.textDim,
    fontSize: FONT.sm,
    marginTop: SPACING.xs,
  },

  chipScroll: {
    marginBottom: SPACING.md,
  },

  chipRow: {
    gap: SPACING.sm,
  },

  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },

  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  chipText: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
    fontWeight: "600",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },

  empty: {
    alignItems: "center",
    paddingTop: SPACING.xxl * 2,
  },

  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize: FONT.md,
  },
});