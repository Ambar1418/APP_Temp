import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const TabSection = () => {
  const { lang, competition } = useApp();
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'judging' | 'rules'
  const [expanded, setExpanded] = useState(false);

  if (!competition?.contentTabs) return null;

  const tabs = [
    { key: 'about', label: lang === 'en' ? 'About Competition' : 'प्रतियोगिता के बारे में' },
    { key: 'judging', label: lang === 'en' ? 'Judging Parameters' : 'मूल्यांकन के मापदंड' },
    { key: 'rules', label: lang === 'en' ? 'Rules & Eligibility' : 'नियम और पात्रता' },
  ];

  const activeContent = competition.contentTabs[activeTab]?.[lang] || competition.contentTabs[activeTab]?.en || '';

  return (
    <View style={styles.container}>
      {/* Tabs Header */}
      <View style={styles.tabsHeader}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabButton, activeTab === tab.key && styles.activeTabButton]}
            onPress={() => {
              setActiveTab(tab.key);
              setExpanded(false);
            }}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Body */}
      <View style={styles.contentContainer}>
        <Text
          style={styles.bodyText}
          numberOfLines={expanded ? undefined : 3}
        >
          {activeContent}
        </Text>

        <TouchableOpacity
          style={styles.expandBtn}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.expandText}>
            {expanded
              ? (lang === 'en' ? 'View less ▲' : 'कम देखें ▲')
              : (lang === 'en' ? 'View more ▼' : 'और देखें ▼')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tabsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
  },
  activeTabText: {
    fontWeight: '800',
    color: COLORS.primary,
  },
  contentContainer: {
    padding: 16,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#334155',
  },
  expandBtn: {
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  expandText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
