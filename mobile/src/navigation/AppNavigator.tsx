import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../services/supabase'
import Login from '../screens/Login'
import Home from '../screens/Home'
import Signup from '../screens/Signup'
import Activity from '../screens/Activity'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Activity" component={Activity} options={{ title: 'פעילות' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Activity" component={Activity} options={{ title: 'פעילות' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
