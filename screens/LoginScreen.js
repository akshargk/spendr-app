import { useState } from 'react';
import {
View, Text, TextInput, Pressable, StyleSheet,
KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { COLORS, FONT, RADIUS, SPACING } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
const AUTH_ERRORS = {
'auth/user-not-found': 'No account found with that email.',
'auth/wrong-password': 'Wrong password. Try again.',
'auth/invalid-email': "That doesn't look like a valid email.",
'auth/invalid-credential': 'Email or password is incorrect.',
'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
'auth/network-request-failed': 'Network error. Check your connection.',
};
export default function LoginScreen({ navigation }) {
const { signIn } = useAuth();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const onLogin = async () => {
if (!email.trim() || !password) {
setError('Email and password are required.');
return;
}
setLoading(true); setError(null);
try {
await signIn(email.trim(), password);
// No navigation needed — RootNavigator handles it automatically
} catch (e) {
setError(AUTH_ERRORS[e.code] || 'Something went wrong. Try again.');
} finally { setLoading(false); }
};
return (
<KeyboardAvoidingView style={styles.flex}
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
<ScrollView contentContainerStyle={styles.container}
keyboardShouldPersistTaps='handled'>
<Text style={styles.brand}>Spendr</Text>
<Text style={styles.title}>Welcome back</Text>
<Text style={styles.subtitle}>Log in to track your spending vibes</Text>
<Text style={styles.label}>Email</Text>
<TextInput
  style={styles.input}
  autoCapitalize="none"
  keyboardType="email-address"
  placeholder="you@example.com"
  placeholderTextColor={COLORS.textDim}
  value={email}
  onChangeText={(t) => {
    setEmail(t);
    setError(null);
  }}
  returnKeyType="next"
/>
<Text style={styles.label}>Password</Text>
<TextInput style={styles.input} secureTextEntry
placeholder='••••••••' placeholderTextColor={COLORS.textDim}
value={password}
onChangeText={(t) => { setPassword(t); setError(null); }}
returnKeyType='done' onSubmitEditing={onLogin} />
{error ? <Text style={styles.error}>{error}</Text> : null}
<Pressable style={({ pressed }) => [styles.btn,
pressed && styles.btnPressed, loading && styles.btnDisabled]}
onPress={onLogin} disabled={loading}>
<Text style={styles.btnText}>
  {loading ? "Logging in..." : "Log in"}
</Text>
</Pressable>
<View style={styles.divider} />
<Pressable onPress={() => navigation.navigate('SignUp')}>
<Text style={styles.link}>New to Spendr?{' '}<Text style={styles.linkStrong}>Sign up</Text></Text>
</Pressable>
</ScrollView>
</KeyboardAvoidingView>
);
}
const styles = StyleSheet.create({
flex: { flex:1, backgroundColor:COLORS.bg },
container: { flexGrow:1, justifyContent:'center', padding:SPACING.xl },
brand: { color:COLORS.primary, fontSize:FONT.xl, fontWeight:'800', marginBottom:SPACING.sm },
title: { color:COLORS.text, fontSize:FONT.xxl, fontWeight:'800' },
subtitle: { color:COLORS.textMuted, fontSize:FONT.sm, marginTop:4, marginBottom:SPACING.xl },
label: { color:COLORS.textMuted, fontSize:FONT.xs, fontWeight:'700',
textTransform:'uppercase', letterSpacing:0.5, marginBottom:SPACING.xs, marginTop:SPACING.md
},
input: { backgroundColor:COLORS.surface, color:COLORS.text, fontSize:FONT.md,
borderRadius:RADIUS.md, padding:SPACING.md, borderWidth:1.5, borderColor:COLORS.border },
error: { color:COLORS.danger, fontSize:FONT.sm, marginTop:SPACING.sm },
btn: { backgroundColor:COLORS.primary, borderRadius:RADIUS.pill,
padding:SPACING.md, alignItems:'center', marginTop:SPACING.xl },
btnPressed: { opacity:0.85, transform:[{scale:0.98}] },
btnDisabled: { opacity:0.6 },
btnText: { color:COLORS.text, fontSize:FONT.md, fontWeight:'800' },
divider: { height:1, backgroundColor:COLORS.border, marginVertical:SPACING.xl },
link: { color:COLORS.textMuted, fontSize:FONT.sm, textAlign:'center' },
linkStrong: { color:COLORS.primary, fontWeight:'700' },
});