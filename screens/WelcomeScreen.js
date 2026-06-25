import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Animated,
} from "react-native";

import { COLORS, FONT, SPACING, RADIUS } from "../constants/colors";
import { loadProfile } from "../services/storage";

export default function WelcomeScreen({ onGetStarted }) {
  const [name, setName] = useState("");

  // Load saved name once on mount
  useEffect(() => {
    const fetch = async () => {
      const profile = await loadProfile();

      if (profile.name) {
        setName(profile.name);
      }
    };

    fetch();
  }, []);

  // Show personalised greeting if name is saved
  const greeting = name ? `Hey ${name}!` : "Hey there!";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spendr</Text>

      <Text style={styles.greeting}>{greeting}</Text>

      <Text style={styles.tagline}>
        Track your spending vibes
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onGetStarted}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}

export default function WelcomeScreen({
  onGetStarted,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Spendr
      </Text>

      <Text style={styles.greeting}>
        Hey there!
      </Text>

      <Text style={styles.tagline}>
        Track your spending vibes
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed &&
            styles.buttonPressed,
        ]}
        onPress={onGetStarted}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },

  title: {
    fontSize: FONT.display,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -1,
  },

  greeting: {
    fontSize: FONT.xl,
    color: COLORS.text,
    marginTop: SPACING.lg,
  },

  tagline: {
    fontSize: FONT.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xxl,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
  },

  buttonPressed: {
    backgroundColor:
      COLORS.primaryPressed,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: COLORS.text,
    fontSize: FONT.md,
    fontWeight: "600",
  },
});