import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { COLORS } from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  greeting: {
    fontSize: 22,
    color: COLORS.text,
    marginTop: 16,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 6,
    marginBottom: 40,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
  },
  buttonPressed: {
    backgroundColor: COLORS.primaryPressed,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
});


export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spendr</Text>
      <Text style={styles.greeting}>Hey there!</Text>
      <Text style={styles.tagline}>Track your spending vibes</Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => Alert.alert('Coming soon', 'Full app ships Day 14.')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}