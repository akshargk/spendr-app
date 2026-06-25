import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/AuthContext';
import { CategoryFilterProvider } from './context/CategoryFilterContext';
import RootNavigator from './navigation/RootNavigator';
import { saveExpenses, loadExpenses } from './services/storage';
export default function App() {
const [expenses, setExpenses] = useState([]);
const [isLoading, setIsLoading] = useState(true);
// Load saved expenses from AsyncStorage when app starts
useEffect(() => {
const hydrate = async () => {
const saved = await loadExpenses();
if (saved && saved.length > 0) setExpenses(saved);
setIsLoading(false);
};
hydrate();
}, []);
// Save expenses every time the array changes
useEffect(() => {
if (!isLoading) saveExpenses(expenses);
}, [expenses, isLoading]);
const addExpense = (e) => setExpenses((prev) => [e, ...prev]);
const deleteExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id));
return (
<>
<StatusBar style='light' />
<AuthProvider>
<CategoryFilterProvider>
<RootNavigator
expenses={expenses}
addExpense={addExpense}
deleteExpense={deleteExpense}
/>
</CategoryFilterProvider>
</AuthProvider>
</>
);
}