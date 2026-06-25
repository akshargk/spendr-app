import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  NAME: "spendr_user_name",
  BUDGET: "spendr_monthly_budget",
  EXPENSES: "spendr_expenses",
};

// SAVE
export const saveProfile = async (name, budget) => {
  try {
    await AsyncStorage.setItem(KEYS.NAME, String(name));
    await AsyncStorage.setItem(KEYS.BUDGET, String(budget));
  } catch (e) {
    console.error("saveProfile error:", e);
  }
};

// LOAD
export const loadProfile = async () => {
  try {
    const name = await AsyncStorage.getItem(KEYS.NAME);
    const budget = await AsyncStorage.getItem(KEYS.BUDGET);

    return {
      name: name ?? "",
      budget: budget ? Number(budget) : 15000,
    };
  } catch (e) {
    console.error("loadProfile error:", e);

    return {
      name: "",
      budget: 15000,
    };
  }
};

// CLEAR
export const clearProfile = async () => {
  try {
    await AsyncStorage.multiRemove([KEYS.NAME, KEYS.BUDGET]);
  } catch (e) {
    console.error("clearProfile error:", e);
  }
};

// SAVE EXPENSES
export const saveExpenses = async (expenses) => {
  try {
    await AsyncStorage.setItem(
      KEYS.EXPENSES,
      JSON.stringify(expenses)
    );
  } catch (e) {
    console.error("saveExpenses error:", e);
  }
};

// LOAD EXPENSES
export const loadExpenses = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.EXPENSES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("loadExpenses error:", e);
    return [];
  }
};