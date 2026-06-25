import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';

import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function HomeStack({
  expenses,
  deleteExpense,
}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bg,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: COLORS.bg,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: 'Spendr',
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            expenses={expenses}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Detail"
        options={{
          headerTitle: 'Expense Detail',
        }}
      >
        {(props) => (
          <ExpenseDetailScreen
            {...props}
            deleteExpense={deleteExpense}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}