import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const TimerCard = () => {
  const { lang, competition } = useApp();
  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 6, minutes: 28, seconds: 32 });

  useEffect(() => {
    if (!competition?.registrationEndsAt) return;

    const targetDate = new Date(competition.registrationEndsAt).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [competition]);

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.leftGroup}>
          <Text style={styles.hourglassIcon}>⏳</Text>
          <Text style={styles.label}>
            {lang === 'en' ? 'Registration closes in' : 'पंजीकरण समाप्त होने में समय'}
          </Text>
        </View>

        <Text style={styles.timerText}>
          {pad(timeLeft.days)}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
        </Text>

        <View style={styles.hurryBadge}>
          <Text style={styles.hurryText}>⏱ {lang === 'en' ? 'Hurry up!' : 'जल्दी करें!'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.timerBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourglassIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    fontVariant: ['tabular-nums'],
  },
  hurryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hurryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
