import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { VIBES } from "../constants/vibes";

import {
  RADIUS,
  SPACING,
  FONT,
} from "../constants/colors";

// VibePicker is a CONTROLLED component:
//
// selected → string | null
// currently selected vibe key
//
// onSelect → function
// called with vibe key when tapped

export default function VibePicker({
  selected,
  onSelect,
}) {
  return (
    <View style={styles.grid}>
      {Object.entries(VIBES).map(
        ([key, vibe]) => {
          const isActive =
            selected === key;

          return (
            <Pressable
              key={key}
              onPress={() =>
                onSelect(key)
              }
              style={({ pressed }) => [
                styles.vibeBtn,

                isActive && {
                  backgroundColor:
                    vibe.color + "22",
                  borderColor:
                    vibe.color,
                },

                pressed &&
                  styles.vibeBtnPressed,
              ]}
            >
              <Text
                style={styles.vibeEmoji}
              >
                {vibe.emoji}
              </Text>

              <Text
                style={[
                  styles.vibeLabel,

                  isActive && {
                    color: vibe.color,
                  },
                ]}
              >
                {vibe.label}
              </Text>

              {isActive && (
                <View
                  style={[
                    styles.activeDot,
                    {
                      backgroundColor:
                        vibe.color,
                    },
                  ]}
                />
              )}
            </Pressable>
          );
        }
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  vibeBtn: {
    flex: 1,
    minWidth: "44%",

    alignItems: "center",

    paddingVertical: 16,

    borderRadius: RADIUS.lg,

    borderWidth: 1.5,

    borderColor: "#334155",

    backgroundColor: "#1E293B",

    position: "relative",
  },

  vibeBtnPressed: {
    opacity: 0.75,

    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  vibeEmoji: {
    fontSize: 28,

    marginBottom: 6,
  },

  vibeLabel: {
    color: "#94A3B8",

    fontSize: FONT.sm,

    fontWeight: "700",
  },

  activeDot: {
    position: "absolute",

    top: 8,
    right: 8,

    width: 8,
    height: 8,

    borderRadius: 4,
  },
});