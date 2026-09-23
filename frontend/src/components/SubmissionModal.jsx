import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

export const SubmissionModal = () => {
  const {
    lang,
    showSubmissionModal,
    setShowSubmissionModal,
    submitPerformance,
    userStatus
  } = useApp();

  const [title, setTitle] = useState(userStatus.submission?.title || 'Classical Kathak Solo');
  const [videoUrl, setVideoUrl] = useState(userStatus.submission?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [notes, setNotes] = useState(userStatus.submission?.notes || 'Performed in Teentaal with Shiv Vandana');
  const [submitting, setSubmitting] = useState(false);

  if (!showSubmissionModal) return null;

  const handleSubmit = async () => {
    setSubmitting(true);
    await submitPerformance(title, videoUrl, notes);
    setSubmitting(false);
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={showSubmissionModal}
      onRequestClose={() => setShowSubmissionModal(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {userStatus.isSubmitted
                ? (lang === 'en' ? 'Your Submitted Entry' : 'आपकी जमा की गई प्रविष्टि')
                : (lang === 'en' ? 'Upload Performance Submission' : 'प्रदर्शन सबमिशन अपलोड करें')}
            </Text>
            <TouchableOpacity onPress={() => setShowSubmissionModal(false)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{lang === 'en' ? 'Performance Title' : 'प्रदर्शन शीर्षक'}</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Kathak Dance Solo"
              editable={!userStatus.isSubmitted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{lang === 'en' ? 'Video URL / Drive Link' : 'वीडियो यूआरएल / ड्राइव लिंक'}</Text>
            <TextInput
              style={styles.input}
              value={videoUrl}
              onChangeText={setVideoUrl}
              placeholder="https://..."
              editable={!userStatus.isSubmitted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{lang === 'en' ? 'Performance Notes' : 'प्रदर्शन विवरण'}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              placeholder="Add details about your choreo, raag, or taal..."
              editable={!userStatus.isSubmitted}
            />
          </View>

          {!userStatus.isSubmitted && (
            <TouchableOpacity
              style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Text style={styles.submitBtnText}>
                {submitting
                  ? (lang === 'en' ? 'Uploading...' : 'अपलोड हो रहा है...')
                  : (lang === 'en' ? 'Submit Entry' : 'प्रविष्टि जमा करें')}
              </Text>
            </TouchableOpacity>
          )}

          {userStatus.isSubmitted && (
            <View style={styles.submittedBox}>
              <Text style={styles.submittedBadge}>
                {lang === 'en' ? '✅ Status: Submitted & Under Review' : '✅ स्थिति: जमा और समीक्षाधीन'}
              </Text>
            </View>
          )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    fontSize: 18,
    fontWeight: '700',
    color: '#94A3B8',
    padding: 4,
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  submittedBox: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    alignItems: 'center',
  },
  submittedBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
