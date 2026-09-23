import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export const UserReviewsCard = () => {
  const { lang, setShowReviewsModal } = useApp();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => setShowReviewsModal(true)}>
        <Text style={styles.icon}>💬</Text>
        <View style={styles.textCol}>
          <Text style={styles.title}>
            {lang === 'en' ? 'Hear From Our Users' : 'हमारे उपयोगकर्ताओं की राय'}
          </Text>
          <Text style={styles.sub}>
            {lang === 'en' ? 'See what participants say about Feedants' : 'देखें प्रतिभागी फीडांट्स के बारे में क्या कहते हैं'}
          </Text>
        </View>
        <Text style={styles.chevron}>❯</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  sub: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  chevron: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 8,
  },
});
