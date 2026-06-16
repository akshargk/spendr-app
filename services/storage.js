import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  NAME: 'profile_name',
  BUDGET: 'profile_budget',
};

export const saveProfile = async (name, budget) => {
  try {
    await AsyncStorage.setItem(KEYS.NAME, String(name));
    await AsyncStorage.setItem(KEYS.BUDGET, String(budget));
  } catch (e) {
    console.error(e);
  }
};

export const loadProfile = async () => {
  try {
    const name = await AsyncStorage.getItem(KEYS.NAME);
    const budget = await AsyncStorage.getItem(KEYS.BUDGET);

    return {
      name: name ?? '',
      budget: budget ? Number(budget) : 15000,
    };
  } catch (e) {
    console.error(e);

    return {
      name: '',
      budget: 15000,
    };
  }
};