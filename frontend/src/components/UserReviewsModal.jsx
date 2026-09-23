import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const UserReviewsModal = () => {
  const { lang, showReviewsModal, setShowReviewsModal } = useApp();

  if (!showReviewsModal) return null;

  const reviews = [
    {
      name: 'Ananya Sharma',
      rating: '⭐⭐⭐⭐⭐',
      text: lang === 'en'
        ? 'Great platform! Received my prize money within 24 hours of results.'
        : 'शानदार प्लेटफॉर्म! नतीजों के 24 घंटे के भीतर मुझे इनाम की राशि मिल गई।'
    },
    {
      name: 'Vikram Rajput',
      rating: '⭐⭐⭐⭐⭐',
      text: lang === 'en'
        ? 'The feedback from professional Kathak judges was extremely helpful for my dance career.'
        : 'पेशेवर कथक जजों की प्रतिक्रिया मेरे नृत्य करियर के लिए बहुत मददगार रही।'
    },
    {
      name: 'Pooja Nair',
      rating: '⭐⭐⭐⭐⭐',
      text: lang === 'en'
        ? 'Fair judging and very smooth submission process. Highly recommended for artists!'
        : 'निष्पक्ष मूल्यांकन और बहुत सहज सबमिशन प्रक्रिया। कलाकारों के लिए अत्यधिक अनुशंसित!'
    }
  ];

  return (
    <Modal
      transparent
      animationType="slide"
      visible={showReviewsModal}
      onRequestClose={() => setShowReviewsModal(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {lang === 'en' ? 'Participant Reviews' : 'प्रतिभागियों की समीक्षाएँ'}
            </Text>
            <TouchableOpacity onPress={() => setShowReviewsModal(false)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scroll}>
            {reviews.map((rev, idx) => (
              <View key={idx} style={styles.reviewCard}>
                <View style={styles.topRow}>
                  <Text style={styles.reviewerName}>{rev.name}</Text>
                  <Text style={styles.rating}>{rev.rating}</Text>
                </View>
                <Text style={styles.reviewText}>{rev.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    fontSize: 18,
    fontWeight: '700',
    color: '#94A3B8',
  },
  scroll: {
    marginTop: 4,
  },
  reviewCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  rating: {
    fontSize: 11,
  },
  reviewText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#334155',
  },
});
