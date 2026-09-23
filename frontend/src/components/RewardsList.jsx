import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const RewardsList = () => {
  const { lang, competition } = useApp();

  if (!competition?.rewards?.length) return null;

  const rankIcons = ['🏆', '🥈', '🥉', '⭐', '⭐', '⭐'];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {lang === 'en' ? 'Rewards ' : 'पुरस्कार '}
        <Text style={styles.subTitle}>({lang === 'en' ? 'All Positions' : 'सभी स्थान'})</Text>
      </Text>

      <View style={styles.listCard}>
        {competition.rewards.map((item, index) => {
          const rankText = item.rank?.[lang] || item.rank?.en;
          const isLast = index === competition.rewards.length - 1;

          return (
            <View key={index} style={[styles.rewardRow, !isLast && styles.borderBottom]}>
              <View style={styles.rankLeft}>
                <Text style={styles.rankIcon}>{rankIcons[index] || '🏅'}</Text>
                <Text style={styles.rankLabel}>{rankText}</Text>
              </View>

              <Text style={styles.rewardAmount}>₹ {item.amount}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  listCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  rankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  rankLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  rewardAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
