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

import { VIBES } from '../constants/vibes';

export default function VibePicker({
  selected,
  onSelect,
}) {
  return (
    <View style={styles.container}>
      {Object.entries(VIBES).map(
        ([key, vibe]) => {
          const isSelected =
            selected === key;

          return (
            <Pressable
              key={key}
              onPress={() =>
                onSelect(key)
              }
              style={[
                styles.card,

                isSelected && {
                  borderColor:
                    vibe.color,

                  backgroundColor:
                    vibe.color +
                    '15',
                },
              ]}
            >
              <Text
                style={styles.emoji}
              >
                {vibe.emoji}
              </Text>

              <Text
                style={[
                  styles.label,

                  isSelected && {
                    color:
                      vibe.color,
                  },
                ]}
              >
                {vibe.label}
              </Text>
            </Pressable>
          );
        }
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },

  card: {
    width: '48%',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor:
      COLORS.surface,
    alignItems: 'center',
  },

  emoji: {
    fontSize: 28,
    marginBottom: 6,
  },

  label: {
    color: COLORS.text,
    fontSize: FONT.sm,
    fontWeight: '700',
  },
});