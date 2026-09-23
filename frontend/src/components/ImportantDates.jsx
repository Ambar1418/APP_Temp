import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const ImportantDates = () => {
  const { lang, competition } = useApp();

  if (!competition?.importantDates) return null;

  const dates = competition.importantDates;

  const items = [
    {
      icon: '📅',
      label: lang === 'en' ? 'Register Before' : 'पंजीकरण अंतिम तिथि',
      value: dates.registerBefore?.[lang] || dates.registerBefore?.en,
    },
    {
      icon: '🚀',
      label: lang === 'en' ? 'Submission Starts' : 'सबमिशन शुरू',
      value: dates.submissionStarts?.[lang] || dates.submissionStarts?.en,
    },
    {
      icon: '📤',
      label: lang === 'en' ? 'Submission Ends' : 'सबमिशन समाप्त',
      value: dates.submissionEnds?.[lang] || dates.submissionEnds?.en,
    },
    {
      icon: '🏆',
      label: lang === 'en' ? 'Result Date' : 'परिणाम तिथि',
      value: dates.resultDate?.[lang] || dates.resultDate?.en,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{lang === 'en' ? 'Important Dates' : 'महत्वपूर्ण तिथियां'}</Text>
      
      <View style={styles.gridCard}>
        <View style={styles.row}>
          <View style={[styles.cell, styles.borderRight, styles.borderBottom]}>
            <Text style={styles.icon}>{items[0].icon}</Text>
            <View>
              <Text style={styles.label}>{items[0].label}</Text>
              <Text style={styles.value}>{items[0].value}</Text>
            </View>
          </View>

          <View style={[styles.cell, styles.borderBottom]}>
            <Text style={styles.icon}>{items[1].icon}</Text>
            <View>
              <Text style={styles.label}>{items[1].label}</Text>
              <Text style={styles.value}>{items[1].value}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.cell, styles.borderRight]}>
            <Text style={styles.icon}>{items[2].icon}</Text>
            <View>
              <Text style={styles.label}>{items[2].label}</Text>
              <Text style={styles.value}>{items[2].value}</Text>
            </View>
          </View>

          <View style={styles.cell}>
            <Text style={styles.icon}>{items[3].icon}</Text>
            <View>
              <Text style={styles.label}>{items[3].label}</Text>
              <Text style={styles.value}>{items[3].value}</Text>
            </View>
          </View>
        </View>
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
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
});
