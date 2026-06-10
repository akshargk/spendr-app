import {
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

import BudgetCard from "../components/BudgetCard";

export default function ProfileScreen() {
  const name = "Hey there";
  const personality = "The Cautious Spender";
  const monthlyBudget = 15000;
  const spent = 6200;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.avatarBlock}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>
          {name}
        </Text>

        <View style={styles.personalityBadge}>
          <Text style={styles.personalityText}>
            {personality}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: SPACING.lg,
        }}
      >
        <BudgetCard
          monthlyBudget={monthlyBudget}
          spent={spent}
        />
      </View>

      <Text style={styles.versionTag}>
        Spendr v1.0 Bootcamp build
      </Text>
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

  avatarBlock: {
    alignItems: "center",
    paddingTop: SPACING.md,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: COLORS.primarySoft,
  },

  avatarText: {
    color: COLORS.text,
    fontSize: FONT.xxl,
    fontWeight: "800",
  },

  name: {
    color: COLORS.text,
    fontSize: FONT.xl,
    fontWeight: "800",
    marginTop: SPACING.md,
  },

  personalityBadge: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.md,
  },

  personalityText: {
    color: COLORS.primary,
    fontSize: FONT.sm,
    fontWeight: "700",
  },

  versionTag: {
    color: COLORS.textDim,
    fontSize: FONT.xs,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});