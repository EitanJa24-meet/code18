import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function Activity() {
  const route: any = useRoute()
  const category = route?.params?.category || 'ללא קטגוריה'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>מסך פעילות</Text>
      <Text style={styles.subtitle}>הקטגוריה שנבחרה: {category}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF7F5',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#2D2A26',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6560',
  },
})
