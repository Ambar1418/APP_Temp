import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const ActionFooter = () => {
  const {
    lang,
    userStatus,
    registerForCompetition,
    setShowSubmissionModal,
    showToast
  } = useApp();

  const handlePress = async () => {
    if (userStatus.isSubmitted) {
      showToast(lang === 'en' ? 'Submission already uploaded! Reviewing entry.' : 'सबमिशन पहले ही अपलोड किया जा चुका है!');
    } else if (userStatus.isRegistered) {
      setShowSubmissionModal(true);
    } else {
      await registerForCompetition();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonTitle}>
          {userStatus.isSubmitted
            ? (lang === 'en' ? 'View Submitted Entry' : 'जमा की गई प्रविष्टि देखें')
            : userStatus.isRegistered
            ? (lang === 'en' ? 'Upload Submission' : 'सबमिशन अपलोड करें')
            : (lang === 'en' ? 'Register Now • ₹99' : 'अभी पंजीकरण करें • ₹99')}
        </Text>
        <Text style={styles.buttonSub}>
          {userStatus.isSubmitted
            ? (lang === 'en' ? 'Entry received' : 'प्रविष्टि प्राप्त हुई')
            : userStatus.isRegistered
            ? (lang === 'en' ? 'Registered' : 'पंजीकृत')
            : (lang === 'en' ? 'Instant Access' : 'तत्काल पहुँच')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  buttonSub: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
});
