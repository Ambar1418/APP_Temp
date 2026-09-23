import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const Header = () => {
  const { lang, toggleLanguage, resetState } = useApp();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => alert(lang === 'en' ? 'Navigating back' : 'पीछे जा रहे हैं')}>
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backText}>{lang === 'en' ? 'Go back' : 'पीछे जाएं'}</Text>
      </TouchableOpacity>

      <View style={styles.rightGroup}>
        <TouchableOpacity style={styles.resetBtn} onPress={resetState} title="Reset Demo Data">
          <Text style={styles.resetText}>↻ Reset</Text>
        </TouchableOpacity>

        <View style={styles.langToggleContainer}>
          <TouchableOpacity
            style={[styles.langOption, lang === 'en' && styles.langOptionActive]}
            onPress={() => toggleLanguage('en')}
          >
            <Text style={[styles.langText, lang === 'en' && styles.langTextActive]}>ENG</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langOption, lang === 'hi' && styles.langOptionActive]}
            onPress={() => toggleLanguage('hi')}
          >
            <Text style={[styles.langText, lang === 'hi' && styles.langTextActive]}>हिंदी</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resetBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginRight: 4,
  },
  resetText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  langToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 2,
  },
  langOption: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
  },
  langOptionActive: {
    backgroundColor: COLORS.primary,
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  langTextActive: {
    color: '#FFFFFF',
  },
});
