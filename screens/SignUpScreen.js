import { useState } from 'react';
import {
View, Text, TextInput, Pressable, StyleSheet,
KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { COLORS, FONT, RADIUS, SPACING } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
export default function SignUpScreen({ navigation }) {
const { signUp } = useAuth();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirm, setConfirm] = useState('');
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const validate = () => {
if (!email.trim().includes('@')) return 'Enter a valid email address.';
if (password.length < 6) return 'Password must be at least 6 characters.';
if (password !== confirm) return 'Passwords do not match.';
return null;
};
const onSignUp = async () => {
setError(null);
const validationError = validate();
if (validationError) { setError(validationError); return; }
setLoading(true);
try {
await signUp(email.trim(), password);
// No navigation needed — RootNavigator handles it automatically
} catch (e) {
if (e.code === 'auth/email-already-in-use')
setError('That email is already registered. Try logging in.');
else
setError(e.message || 'Sign up failed. Try again.');
} finally { setLoading(false); }
};
return (
<KeyboardAvoidingView style={styles.flex}
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
<ScrollView contentContainerStyle={styles.container}
keyboardShouldPersistTaps='handled'>
<Text style={styles.brand}>Spendr</Text>
<Text style={styles.title}>Create account</Text>
<Text style={styles.subtitle}>One step before you start tracking</Text>
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
<TextInput
  style={styles.input}
  secureTextEntry
  placeholder="At least 6 characters"
  placeholderTextColor={COLORS.textDim}
  value={password}
  onChangeText={(t) => {
    setPassword(t);
    setError(null);
  }}
  returnKeyType="next"
/>
<Text style={styles.label}>Confirm Password</Text>
<TextInput style={styles.input} secureTextEntry
placeholder='Type it again' placeholderTextColor={COLORS.textDim}
value={confirm}
onChangeText={(t) => { setConfirm(t); setError(null); }}
returnKeyType='done' onSubmitEditing={onSignUp} />
{error ? <Text style={styles.error}>{error}</Text> : null}
<Pressable style={({ pressed }) => [styles.btn,
pressed && styles.btnPressed, loading && styles.btnDisabled]}
onPress={onSignUp} disabled={loading}>
<Text style={styles.btnText}>
  {loading ? 'Creating account...' : 'Sign up'}
</Text>
</Pressable>
<View style={styles.divider} />
<Pressable onPress={() => navigation.navigate('Login')}>
<Text style={styles.link}>Already have an account?{' '}<Text style={styles.linkStrong}>Log in</Text></Text>
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