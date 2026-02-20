import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type DailyLog = {
  category?: string | null
  commitment_text?: string | null
} | null

type Props = {
  dailyLog: DailyLog
  onCategoryClick: (category: string) => void
}

const categories = ['לימוד', 'משמעת', 'תרומה', 'הנהגה']

export default function DailyCommitment({ dailyLog, onCategoryClick }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>התחייבות יומית</Text>
      <Text style={styles.subtitle}>בחר קטגוריה לפעולה שלך היום</Text>

      <View style={styles.grid}>
        {categories.map((category) => {
          const selected = dailyLog?.category === category
          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selected && styles.categoryButtonSelected]}
              onPress={() => onCategoryClick(category)}
            >
              <Text style={[styles.categoryText, selected && styles.categoryTextSelected]}>{category}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {dailyLog?.commitment_text ? (
        <View style={styles.commitmentBox}>
          <Text style={styles.commitmentLabel}>ההתחייבות שלך:</Text>
          <Text style={styles.commitmentText}>{dailyLog.commitment_text}</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D2A26',
    textAlign: 'right',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#8A8580',
    textAlign: 'right',
  },
  grid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  categoryButton: {
    width: '48%',
    backgroundColor: '#F5F1EE',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#2D2A26',
  },
  categoryText: {
    color: '#5A554F',
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  commitmentBox: {
    marginTop: 14,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F0ECE8',
  },
  commitmentLabel: {
    color: '#6B6560',
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'right',
  },
  commitmentText: {
    color: '#2D2A26',
    fontSize: 14,
    textAlign: 'right',
  },
})
