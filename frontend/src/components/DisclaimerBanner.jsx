import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const DisclaimerBanner = () => {
  const { lang } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.icon}>ℹ️</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>
            {lang === 'en' ? 'Disclaimer: ' : 'अस्वीकरण: '}
          </Text>
          {lang === 'en'
            ? 'Only contributions from paid participants will be considered for judging.'
            : 'केवल भुगतान किए गए प्रतिभागियों के सबमिशन का मूल्यांकन किया जाएगा।'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: '#0369A1',
  },
  bold: {
    fontWeight: '800',
  },
});
