import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export const VideoModal = () => {
  const { videoModalUrl, setVideoModalUrl, lang } = useApp();

  if (!videoModalUrl) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={!!videoModalUrl}
      onRequestClose={() => setVideoModalUrl(null)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {lang === 'en' ? 'Feedants Video Player' : 'फीडांट्स वीडियो प्लेयर'}
            </Text>
            <TouchableOpacity onPress={() => setVideoModalUrl(null)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.videoContainer}>
            <video
              src={videoModalUrl}
              controls
              autoPlay
              style={{ width: '100%', height: 260, borderRadius: 12, backgroundColor: '#000' }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  closeBtn: {
    fontSize: 18,
    fontWeight: '700',
    color: '#94A3B8',
    padding: 4,
  },
  videoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
