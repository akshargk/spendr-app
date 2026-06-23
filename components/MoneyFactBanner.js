import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  FONT,
  RADIUS,
  SPACING,
} from '../constants/colors';

import { fetchMoneyFact } from '../services/api';

export default function MoneyFactBanner() {
  const [fact, setFact] = useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);

  const loadFact = async () => {
    setLoading(true);
    setError(null);

    const result =
      await fetchMoneyFact();

    if (result.success) {
      setFact(result.fact);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadFact();
  }, []);

  // --- LOADING STATE ---

  if (loading) {
    return (
      <View style={styles.banner}>
        <ActivityIndicator
          color={COLORS.primary}
        />

        <Text style={styles.loadingText}>
          Loading fact...
        </Text>
      </View>
    );
  }

  // --- ERROR STATE ---

  if (error) {
    return (
      <Pressable
        style={styles.banner}
        onPress={loadFact}
      >
        <Text style={styles.errorText}>
          Could not load fact. Tap to retry.
        </Text>
      </Pressable>
    );
  }

  // --- SUCCESS STATE ---

  return (
    <View style={styles.banner}>
      <Text style={styles.label}>
        💡 Fact of the Day
      </Text>

      <Text style={styles.factText}>
        {fact}
      </Text>

      <Pressable onPress={loadFact}>
        <Text style={styles.refreshText}>
          ↻ New Fact
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },

  label: {
    color: COLORS.primary,
    fontSize: FONT.sm,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  factText: {
    color: COLORS.text,
    fontSize: FONT.md,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.md,
  },

  loadingText: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
    marginTop: SPACING.sm,
  },

  errorText: {
    color: COLORS.danger,
    fontSize: FONT.sm,
    textAlign: 'center',
  },

  refreshText: {
    color: COLORS.primary,
    fontSize: FONT.sm,
    fontWeight: '700',
  },
});