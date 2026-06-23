import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseDetailScreen({ route }) {
  const expense = route?.params?.expense;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Detail</Text>

      {expense ? (
        <>
          <Text>Amount: Rs. {expense.amount}</Text>
          <Text>Category: {expense.category}</Text>
          <Text>Vibe: {expense.vibe}</Text>
          <Text>Note: {expense.note}</Text>
        </>
      ) : (
        <Text>No expense selected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});