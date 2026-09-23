import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const PreviousWinners = () => {
  const { lang, competition, setVideoModalUrl } = useApp();

  if (!competition?.previousWinners?.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{lang === 'en' ? 'Previous Winners' : 'पिछली प्रतियोगिताओं के विजेता'}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {competition.previousWinners.map((winner) => (
          <TouchableOpacity
            key={winner.id || winner.name}
            style={styles.winnerCard}
            onPress={() => setVideoModalUrl(winner.videoUrl)}
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: winner.avatar }} style={styles.avatar} resizeMode="cover" />
              <View style={styles.playOverlay}>
                <View style={styles.playCircle}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.winnerName} numberOfLines={1}>{winner.name}</Text>
              <Text style={styles.winnerRank}>{winner.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  winnerCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 100,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  avatar: {
    width: '100%',
    height: '100%',
    opacity: 0.88,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  playCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 11,
    color: COLORS.primary,
    marginLeft: 2,
  },
  infoBox: {
    padding: 8,
  },
  winnerName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  winnerRank: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },
});
