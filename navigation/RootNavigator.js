import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/colors';
export default function RootNavigator({ expenses, addExpense, deleteExpense }) {
const { user, initializing } = useAuth();
// Show spinner while Firebase resolves auth state on app start
if (initializing) {
return (
<View style={{ flex:1, backgroundColor:COLORS.bg,
justifyContent:'center', alignItems:'center' }}>
<ActivityIndicator color={COLORS.primary} size='large' />
</View>
);
}
return (
<NavigationContainer>
{user ? (
// Logged in → show the full app
<BottomTabs expenses={expenses} addExpense={addExpense}
deleteExpense={deleteExpense} />
) : (
// Not logged in → show Login / SignUp
<AuthStack />
)}
</NavigationContainer>
);
}
