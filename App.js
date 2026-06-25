import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from './screens/WelcomeScreen';
import BottomTabs from './navigation/BottomTabs';

import { CategoryFilterProvider } from './context/CategoryFilterContext';
import { saveExpenses, loadExpenses } from './services/storage';

export default function App() {
  const [showWelcome, setShowWelcome] =
    useState(true);

  const [expenses, setExpenses] =
    useState([]);

  // Step 2 — Hydrate on mount
  // Load saved expenses from AsyncStorage when app starts
  useEffect(() => {
    const hydrate = async () => {
      const saved = await loadExpenses();
      setExpenses(saved);
    };
    hydrate();
  }, []);

  // Step 3 — Persist on change
  // Save expenses to AsyncStorage every time the array changes
  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  // Step 1 — Add expense
  const addExpense = (newExpense) => {
    setExpenses((prev) => [
      newExpense,
      ...prev,
    ]);
  };

  // Step 4 — Delete expense by id
  const deleteExpense = (id) => {
    setExpenses((prev) =>
      prev.filter((e) => e.id !== id)
    );
  };

  if (showWelcome) {
    return (
      <>
        <StatusBar style="light" />

        <WelcomeScreen
          onGetStarted={() =>
            setShowWelcome(false)
          }
        />
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />

      <CategoryFilterProvider>
        <NavigationContainer>
          <BottomTabs
            expenses={expenses}
            addExpense={addExpense}
            deleteExpense={deleteExpense}
          />
        </NavigationContainer>
      </CategoryFilterProvider>
    </>
  );
}