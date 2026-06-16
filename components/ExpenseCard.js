import { useState } from 'react';
import {
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

import { getVibe } from '../constants/vibes';

const formatINR = (n) =>
  'Rs. ' +
  Number(n).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });

const timeAgo = (timestamp) => {
  const hours = Math.floor(
    (Date.now() - timestamp) /
      (1000 * 60 * 60)
  );

  if (hours < 1) return 'Just now';

  if (hours < 24)
    return `${hours}h ago`;

  const days = Math.floor(hours / 24);

  return days === 1
    ? 'Yesterday'
    : `${days} days ago`;
};

export default function ExpenseCard({
  expense,
}) {
  const [expanded, setExpanded] =
    useState(false);

  const vibe = getVibe(expense.vibe);

  return (
    <Pressable
      onPress={() =>
        setExpanded(!expanded)
      }
      style={({ pressed }) => [
        styles.card,
        {
          borderLeftColor:
            vibe.color,
        },
        pressed &&
          styles.cardPressed,
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.emoji}>
          {vibe.emoji}
        </Text>

        <View style={styles.middle}>
          <Text
            style={styles.note}
            numberOfLines={
              expanded ? 0 : 1
            }
          >
            {expense.note}
          </Text>

          <Text style={styles.meta}>
            {expense.category} ·{' '}
            {timeAgo(expense.date)}
          </Text>
        </View>

        <Text style={styles.amount}>
          {formatINR(
            expense.amount
          )}
        </Text>
      </View>

      {expanded && (
        <View style={styles.details}>
          <View
            style={[
              styles.vibeBadge,
              {
                backgroundColor:
                  vibe.color + '22',
              },
            ]}
          >
            <Text
              style={[
                styles.vibeBadgeText,
                {
                  color:
                    vibe.color,
                },
              ]}
            >
              {vibe.emoji}{' '}
              {vibe.label} —{' '}
              {
                vibe.description
              }
            </Text>
          </View>

          <Text
            style={styles.detailHint}
          >
            Tap again to collapse
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:
      COLORS.surface,

    borderRadius:
      RADIUS.lg,

    padding: SPACING.lg,

    marginBottom:
      SPACING.md,

    borderLeftWidth: 4,
  },

  cardPressed: {
    backgroundColor:
      COLORS.surfaceElevated,

    transform: [
      { scale: 0.99 },
    ],
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },

  emoji: {
    fontSize: 26,
  },

  middle: {
    flex: 1,
  },

  note: {
    color: COLORS.text,
    fontSize: FONT.md,
    fontWeight: '600',
  },

  meta: {
    color:
      COLORS.textMuted,

    fontSize: FONT.xs,

    marginTop: 2,

    textTransform:
      'capitalize',
  },

  amount: {
    color: COLORS.text,
    fontSize: FONT.lg,
    fontWeight: '800',
  },

  details: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor:
      COLORS.border,
  },

  vibeBadge: {
    borderRadius:
      RADIUS.md,

    paddingHorizontal:
      SPACING.md,

    paddingVertical:
      SPACING.sm,

    alignSelf:
      'flex-start',
  },

  vibeBadgeText: {
    fontSize: FONT.sm,
    fontWeight: '700',
  },

  detailHint: {
    color:
      COLORS.textDim,

    fontSize: FONT.xs,

    marginTop:
      SPACING.sm,
  },
});