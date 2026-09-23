import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export const AdCard = () => {
  const { lang } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>📢 {lang === 'en' ? 'Ad Here' : 'यहाँ विज्ञापन'}</Text>
      </View>
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
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
});
