import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ExpenseCard from '../components/ExpenseCard';
import { FAKE_EXPENSES } from '../constants/expenses';

export default function HomeScreen() {
  const total = FAKE_EXPENSES.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={FAKE_EXPENSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard expense={item} />
        )}
        contentContainerStyle={{
          padding: 20,
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.label}>
              THIS WEEK
            </Text>

            <Text style={styles.total}>
              Rs. {total}
            </Text>

            <Text style={styles.sub}>
              {FAKE_EXPENSES.length} expenses
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  header: {
    marginBottom: 20,
  },

  label: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },

  total: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '800',
    marginTop: 6,
  },

  sub: {
    color: '#94A3B8',
    marginTop: 4,
  },
});