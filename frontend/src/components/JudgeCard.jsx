import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const JudgeCard = () => {
  const { lang, competition, setVideoModalUrl } = useApp();

  if (!competition || !competition.judge) return null;

  const judge = competition.judge;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: judge.avatar }}
          style={styles.avatar}
          resizeMode="cover"
        />

        <View style={styles.infoCol}>
          <Text style={styles.judgeTag}>{lang === 'en' ? 'Judge' : 'जज'}</Text>
          <Text style={styles.judgeName}>{judge.name}</Text>
          <Text style={styles.judgeTitle}>{judge.title}</Text>
          <Text style={styles.judgeExp}>{judge.experience}</Text>
        </View>

        <TouchableOpacity
          style={styles.videoBtn}
          onPress={() => setVideoModalUrl(judge.videoUrl)}
        >
          <View style={styles.playCircle}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <Text style={styles.videoBtnText}>{lang === 'en' ? 'Intro Video' : 'परिचय वीडियो'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  infoCol: {
    flex: 1,
  },
  judgeTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 2,
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  judgeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  judgeExp: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 2,
  },
  videoBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  playIcon: {
    fontSize: 14,
    color: '#0284C7',
    marginLeft: 2,
  },
  videoBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
});
