import React, { useEffect, useMemo, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  I18nManager,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../services/supabase'
import DailyCommitment from '../components/home/DailyCommitment'

type DailyLog = {
  id: string
  date: string
  category: string | null
  commitment_text: string | null
}

if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true)
  I18nManager.forceRTL(true)
}

export default function Home() {
  const navigation: any = useNavigation()
  const [userName, setUserName] = useState('')
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null)
  const [loading, setLoading] = useState(true)

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser()
      if (authError) throw authError

      const currentUser = authData.user
      const fullName = currentUser?.user_metadata?.full_name || currentUser?.email || ''
      setUserName(fullName)

      if (!currentUser?.id) {
        setLoading(false)
        return
      }

      const { data: logData, error: logError } = await supabase
        .from('DailyLog')
        .select('id, date, category, commitment_text')
        .eq('user_id', currentUser.id)
        .eq('date', today)
        .limit(1)

      if (logError) {
        console.error('Failed loading daily log:', logError.message)
      } else if (logData?.length) {
        setDailyLog(logData[0])
      }
    } catch (error: any) {
      console.error(error?.message || error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (category: string) => {
    navigation.navigate('Activity', { category })
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigation.replace('Login')
    } catch (err: any) {
      console.error('Logout error:', err.message)
    }
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#8A8580" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(userName || 'א').charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.greetingWrap}>
          <Text style={styles.dateText}>
            {new Intl.DateTimeFormat('he-IL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            }).format(new Date())}
          </Text>
          <Text style={styles.greeting}>שלום{userName ? `, ${userName.split(' ')[0]}` : ''}</Text>
        </View>
      </View>

      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>"אל תאמר לכשאפנה אשנה, שמא לא תפנה"</Text>
        <Text style={styles.quoteSource}>פרקי אבות</Text>
      </View>

      <DailyCommitment dailyLog={dailyLog} onCategoryClick={handleCategoryClick} />

      <View style={styles.badgeWrap}>
        <Text style={styles.badge}>קוד 18 · משמעת · תרומה · הנהגה</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>התנתקות</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: '#FAF7F5',
    paddingBottom: 32,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF7F5',
  },
  header: {
    marginTop: 20,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingWrap: {
    alignItems: 'flex-end',
  },
  dateText: {
    color: '#8A8580',
    fontSize: 13,
  },
  greeting: {
    marginTop: 4,
    color: '#2D2A26',
    fontSize: 24,
    fontWeight: '700',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2D2A26',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  quoteCard: {
    marginTop: 16,
    marginHorizontal: 24,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#2D2A26',
  },
  quoteText: {
    color: '#F7F6F5',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'right',
  },
  quoteSource: {
    color: '#CEC8C2',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
  },
  badgeWrap: {
    marginTop: 18,
    alignItems: 'center',
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 99,
    overflow: 'hidden',
    backgroundColor: '#F0ECE8',
    color: '#6B6560',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#2D2A26',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
})
