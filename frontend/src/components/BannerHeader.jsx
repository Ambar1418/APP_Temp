import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const BannerHeader = () => {
  const { lang, competition, userStatus } = useApp();

  if (!competition) return null;

  const title = competition.title?.[lang] || competition.title?.en;
  const certBadge = competition.certificateBadge?.[lang] || competition.certificateBadge?.en;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.statusBadge, userStatus.isRegistered ? styles.registeredBadge : styles.openBadge]}>
          <Text style={[styles.statusText, userStatus.isRegistered ? styles.registeredText : styles.openText]}>
            {userStatus.isRegistered
              ? (lang === 'en' ? '✔ Registered' : '✔ पंजीकृत')
              : (lang === 'en' ? '● Open' : '● खुला')}
          </Text>
        </View>
      </View>

      <View style={styles.tagsRow}>
        {competition.tags?.map((tag, idx) => (
          <View key={idx} style={styles.tagPill}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        <View style={styles.certPill}>
          <Text style={styles.certText}>🏆 {certBadge}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  registeredBadge: {
    backgroundColor: COLORS.registeredBadgeBg,
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },
  openBadge: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  registeredText: {
    color: COLORS.registeredBadgeText,
  },
  openText: {
    color: '#D97706',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  certPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  certText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
