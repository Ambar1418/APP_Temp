import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const BottomNav = () => {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState('competitions');

  const navItems = [
    { key: 'home', icon: '🏠', label: lang === 'en' ? 'Home' : 'होम' },
    { key: 'explore', icon: '🔍', label: lang === 'en' ? 'Explore' : 'खोजें' },
    { key: 'create', icon: '+', isCenter: true },
    { key: 'competitions', icon: '🏆', label: lang === 'en' ? 'Competitions' : 'प्रतियोगिताएं' },
    {
      key: 'profile',
      label: lang === 'en' ? 'Profile' : 'प्रोफ़ाइल',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
    }
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = activeTab === item.key;

        if (item.isCenter) {
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.centerBtn}
              onPress={() => alert(lang === 'en' ? 'Create new post' : 'नया पोस्ट बनाएं')}
            >
              <Text style={styles.centerPlus}>+</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.tabItem}
            onPress={() => setActiveTab(item.key)}
          >
            {item.avatar ? (
              <Image source={{ uri: item.avatar }} style={[styles.avatar, isActive && styles.avatarActive]} />
            ) : (
              <Text style={[styles.tabIcon, isActive && styles.activeTabIcon]}>{item.icon}</Text>
            )}
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: 6,
    height: 60,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    fontSize: 18,
    color: '#94A3B8',
    marginBottom: 2,
  },
  activeTabIcon: {
    color: COLORS.primary,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeTabLabel: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginBottom: 2,
  },
  avatarActive: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  centerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  centerPlus: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: -2,
  },
});
