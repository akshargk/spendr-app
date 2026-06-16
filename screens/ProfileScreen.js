import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import BudgetCard from '../components/BudgetCard';

import {
  COLORS,
  FONT,
  RADIUS,
  SPACING,
} from '../constants/colors';

import {
  loadProfile,
  saveProfile,
} from '../services/storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('15000');
  const [spent] = useState(6200);

  const [editMode, setEditMode] = useState(false);

  const [nameErr, setNameErr] = useState('');
  const [budgetErr, setBudgetErr] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await loadProfile();

      setName(profile.name);
      setBudget(String(profile.budget));
    };

    fetchProfile();
  }, []);

  const validate = () => {
    let valid = true;

    if (!name.trim()) {
      setNameErr('Please enter your name');
      valid = false;
    } else {
      setNameErr('');
    }

    if (
      !budget ||
      isNaN(Number(budget)) ||
      Number(budget) <= 0
    ) {
      setBudgetErr('Enter a valid budget');
      valid = false;
    } else {
      setBudgetErr('');
    }

    return valid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    await saveProfile(
      name.trim(),
      Number(budget)
    );

    setEditMode(false);

    Alert.alert(
      'Saved',
      'Profile updated successfully!'
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.avatarBlock}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name
                ? name.charAt(0).toUpperCase()
                : '?'}
            </Text>
          </View>

          {editMode ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
              />

              {nameErr ? (
                <Text style={styles.error}>
                  {nameErr}
                </Text>
              ) : null}

              <TextInput
                style={styles.input}
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
                placeholder="Monthly Budget"
              />

              {budgetErr ? (
                <Text style={styles.error}>
                  {budgetErr}
                </Text>
              ) : null}

              <Pressable
                style={styles.button}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>
                  Save Profile
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.name}>
                {name || 'Your Name'}
              </Text>

              <View
                style={styles.personalityBadge}
              >
                <Text
                  style={styles.personalityText}
                >
                  The Cautious Spender
                </Text>
              </View>

              <Pressable
                style={styles.button}
                onPress={() =>
                  setEditMode(true)
                }
              >
                <Text style={styles.buttonText}>
                  Edit Profile
                </Text>
              </Pressable>
            </>
          )}
        </View>

        <View
          style={{
            marginTop: SPACING.xl,
          }}
        >
          <BudgetCard
            monthlyBudget={Number(budget)}
            spent={spent}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: COLORS.white,
    fontSize: FONT.xxl,
    fontWeight: '800',
  },

  name: {
    color: COLORS.text,
    fontSize: FONT.xl,
    fontWeight: '800',
    marginTop: SPACING.md,
  },

  personalityBadge: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },

  personalityText: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  input: {
    width: '100%',
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
  },

  button: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  error: {
    color: 'red',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});