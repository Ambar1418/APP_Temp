import React from 'react';
import { View, ScrollView, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BannerHeader } from './components/BannerHeader';
import { StatsSection } from './components/StatsSection';
import { JudgeCard } from './components/JudgeCard';
import { TimerCard } from './components/TimerCard';
import { ImportantDates } from './components/ImportantDates';
import { PreviousWinners } from './components/PreviousWinners';
import { TabSection } from './components/TabSection';
import { RewardsList } from './components/RewardsList';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { ExplainerCards } from './components/ExplainerCards';
import { ReferralCard } from './components/ReferralCard';
import { UserReviewsCard } from './components/UserReviewsCard';
import { AdCard } from './components/AdCard';
import { ActionFooter } from './components/ActionFooter';
import { BottomNav } from './components/BottomNav';
import { SubmissionModal } from './components/SubmissionModal';
import { VideoModal } from './components/VideoModal';
import { UserReviewsModal } from './components/UserReviewsModal';
import { Toast } from './components/Toast';

const CompetitionScreen = () => {
  const { loading, error } = useApp();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00796B" />
        <Text style={styles.loadingText}>Loading Feedants Competition...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Connection Error</Text>
        <Text style={styles.errorSub}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerFrame}>
      <View style={styles.phoneContainer}>
        <Toast />

        {/* Fixed Header */}
        <Header />

        {/* Scrollable Content */}
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <BannerHeader />
          <StatsSection />
          <JudgeCard />
          <TimerCard />
          <ImportantDates />
          <PreviousWinners />
          <TabSection />
          <RewardsList />
          <DisclaimerBanner />
          <ExplainerCards />
          <ReferralCard />
          <UserReviewsCard />
          <AdCard />
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Fixed Action Button */}
        <ActionFooter />

        {/* Fixed Bottom Navigation */}
        <BottomNav />

        {/* Active Modals */}
        <SubmissionModal />
        <VideoModal />
        <UserReviewsModal />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <AppProvider>
      <CompetitionScreen />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  outerFrame: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneContainer: {
    width: '100%',
    maxWidth: 480,
    height: '100%',
    maxHeight: 920,
    backgroundColor: '#F4F7F6',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#F4F7F6',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#00796B',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#EF4444',
  },
  errorSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },
});
