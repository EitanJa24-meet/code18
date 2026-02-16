import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { supabase } from '../services/supabase'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
  const navigation: any = useNavigation()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigation.replace('Login')
    } catch (err: any) {
      console.error('Logout error:', err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#e67b4d',
    marginBottom: 32,
  },
  button: {
    height: 48,
    backgroundColor: '#ff8a3d',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})
