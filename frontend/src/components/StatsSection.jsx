import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const StatsSection = () => {
  const { lang, competition } = useApp();

  if (!competition) return null;

  const totalSpots = competition.maxSpots || 20;
  const bookedSpots = competition.bookedSpots || 1;
  const remainingSpots = Math.max(0, totalSpots - bookedSpots);
  const progressPercent = Math.min(100, Math.max(0, (bookedSpots / totalSpots) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        {/* Prize Pool */}
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>{lang === 'en' ? 'Prize Pool' : 'पुरस्कार राशि'}</Text>
          <Text style={styles.statValue}>₹ {competition.prizePool.toLocaleString()}</Text>
        </View>

        {/* Entry Fee */}
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>{lang === 'en' ? 'Entry Fee' : 'प्रवेश शुल्क'}</Text>
          <Text style={styles.statValue}>₹ {competition.entryFee}</Text>
        </View>

        {/* Spots Status */}
        <View style={styles.spotsCol}>
          <View style={styles.spotsHeader}>
            <Text style={styles.spotsIcon}>👥</Text>
            <Text style={styles.spotsText}>
              {lang === 'en' ? `Only ${remainingSpots} spots left` : `केवल ${remainingSpots} स्थान शेष`}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.max(5, progressPercent)}%` }]} />
          </View>

          <Text style={styles.bookedText}>
            {bookedSpots} / {totalSpots} {lang === 'en' ? 'Booked' : 'बुक किए गए'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  spotsCol: {
    flex: 1.4,
  },
  spotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  spotsIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  spotsText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  bookedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
});
