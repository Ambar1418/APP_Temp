import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const ExplainerCards = () => {
  const { lang, setVideoModalUrl } = useApp();

  return (
    <View style={styles.container}>
      {/* Left Explainer: Prize money video */}
      <TouchableOpacity
        style={styles.cardLeft}
        onPress={() => setVideoModalUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4')}
      >
        <View style={styles.playCircle}>
          <Text style={styles.playIcon}>▶</Text>
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.cardTitle}>
            {lang === 'en' ? 'How will you receive prize money?' : 'पुरस्कार राशि कैसे मिलेगी?'}
          </Text>
          <Text style={styles.cardSub}>
            {lang === 'en' ? 'Watch video to know more' : 'अधिक जानने के लिए वीडियो देखें'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Right Box: Policies */}
      <View style={styles.cardRight}>
        <TouchableOpacity style={styles.policyRow} onPress={() => alert(lang === 'en' ? 'Refund Policy: 100% money back guarantee if cancelled before start date.' : 'रिफंड नीति: प्रारंभ तिथि से पहले रद्द करने पर 100% मनी बैक गारंटी।')}>
          <Text style={styles.policyIcon}>🛡️</Text>
          <Text style={styles.policyText}>{lang === 'en' ? 'Refund policy' : 'रिफंड नीति'}</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.policyRow} onPress={() => alert(lang === 'en' ? 'Payments are 256-bit encrypted via Razorpay' : 'रेजरपे के माध्यम से सुरक्षित 256-बिट एन्क्रिप्टेड भुगतान')}>
          <Text style={styles.policyIcon}>🛡️</Text>
          <Text style={styles.policyText}>
            {lang === 'en' ? 'Secure payments powered by ' : 'सुरक्षित भुगतान '}
            <Text style={styles.razorText}>Razorpay</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  cardLeft: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  playCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  playIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 2,
  },
  textGroup: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 14,
  },
  cardSub: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  cardRight: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  policyIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  policyText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
  },
  razorText: {
    fontWeight: '900',
    color: '#0284C7',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
});
