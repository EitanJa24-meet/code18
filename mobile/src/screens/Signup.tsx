import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { supabase } from '../services/supabase'
import { useNavigation } from '@react-navigation/native'

export default function Signup() {
  const navigation: any = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signUpWithEmail = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password.')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      })
      if (error) throw error
      console.info('Sign up successful. Email verification may be required.')
      Alert.alert('Success', 'Account created! Please check your email to verify.')
      navigation.replace('Login')
    } catch (err: any) {
      console.error('Email sign-up failed', err)
      Alert.alert('Sign up failed', err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  const signUpWithGoogle = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
      if (error) throw error
    } catch (err: any) {
      console.error('Google sign-up failed', err)
      Alert.alert('Google sign-up failed', err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#7a5a3c"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#7a5a3c"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={signUpWithEmail} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign up</Text>}
        </TouchableOpacity>

        <Text style={styles.or}>— or —</Text>

        <TouchableOpacity style={styles.googleButton} onPress={signUpWithGoogle} disabled={loading}>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.small}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e67b4d',
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderColor: '#f2d7c7',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fffaf7',
    color: '#4b2e1f',
  },
  button: {
    height: 48,
    backgroundColor: '#ff8a3d',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  or: {
    textAlign: 'center',
    color: '#c07b5b',
    marginVertical: 12,
  },
  googleButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8b79b',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  googleText: {
    color: '#4b2e1f',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  small: {
    color: '#5a3b2a',
  },
  link: {
    color: '#e67b4d',
    fontWeight: '600',
  },
})
