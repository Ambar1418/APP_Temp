import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const ReferralCard = () => {
  const { lang, competition, showToast } = useApp();

  const referralCode = competition?.referralCode || 'referral123';
  const referralUrl = `https://feedants.com/r/${referralCode}`;
  const earnAmount = competition?.referralEarnAmount || 10;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralUrl);
    }
    showToast(
      lang === 'en'
        ? `📋 Referral link copied! Earn ₹${earnAmount} per signup!`
        : `📋 रेफ़रल लिंक कॉपी हो गया! प्रत्येक साइनअप पर ₹${earnAmount} कमाएं!`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>📣</Text>
          </View>

          <View style={styles.headerTextCol}>
            <Text style={styles.title}>
              {lang === 'en' ? 'Refer & Earn more discount' : 'रेफ़र करें और अधिक छूट पाएं'}
            </Text>

            <View style={styles.linkBar}>
              <Text style={styles.urlText} numberOfLines={1}>{referralUrl}</Text>
              <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
                <Text style={styles.copyBtnText}>{lang === 'en' ? 'Copy Link' : 'कॉपी करें'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.referNowBtn} onPress={handleCopy}>
            <Text style={styles.referNowText}>{lang === 'en' ? 'Refer Now' : 'रेफ़र करें'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerNote}>
          {lang === 'en'
            ? `You earn ₹${earnAmount} for every signup`
            : `प्रत्येक साइनअप पर आपको ₹${earnAmount} मिलते हैं`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: COLORS.referralBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#D1F2EE',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
  },
  headerTextCol: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  linkBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingLeft: 8,
    overflow: 'hidden',
  },
  urlText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
  },
  copyBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderLeftWidth: 1,
    borderLeftColor: '#CBD5E1',
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  referNowBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  referNowText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  footerNote: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
});
