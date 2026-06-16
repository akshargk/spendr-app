import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';

import { COLORS } from './constants/colors';
import { FAKE_EXPENSES } from './constants/expenses';

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState('welcome');

  const [expenses, setExpenses] =
    useState(FAKE_EXPENSES);

  const addExpense = (expense) => {
    setExpenses((prev) => [
      expense,
      ...prev,
    ]);
  };

  const NavLink = ({ to, label }) => (
    <Pressable
      onPress={() => setCurrentScreen(to)}
      style={{
        padding: 16,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: COLORS.primary,
          fontWeight: '700',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <>
      <StatusBar style="light" />

      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onGetStarted={() =>
            setCurrentScreen('profile')
          }
        />
      )}

      {currentScreen === 'profile' && (
        <>
          <ProfileScreen />

          <NavLink
            to="home"
            label="View Expenses →"
          />
        </>
      )}

      {currentScreen === 'home' && (
        <>
          <HomeScreen expenses={expenses} />

          <NavLink
            to="add"
            label="+ Add Expense"
          />

          <NavLink
            to="profile"
            label="← Back to Profile"
          />
        </>
      )}

      {currentScreen === 'add' && (
        <>
          <AddScreen
            onAdd={(expense) => {
              addExpense(expense);
              setCurrentScreen('home');
            }}
          />

          <NavLink
            to="home"
            label="← Cancel"
          />
        </>
      )}
    </>
  );
}