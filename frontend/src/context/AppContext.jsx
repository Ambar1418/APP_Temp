import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [competition, setCompetition] = useState(null);
  const [userStatus, setUserStatus] = useState({ isRegistered: false, isSubmitted: false, submission: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Active Modals
  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const fetchCompetitionData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/competitions/feedants-dance-101', {
        headers: { 'x-user-id': 'demo-user-123' }
      });
      const json = await res.json();
      if (json.success) {
        setCompetition(json.data);
        setUserStatus(json.userStatus);
      } else {
        setError(json.message);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Could not connect to Feedants backend API server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitionData();
  }, []);

  const toggleLanguage = (newLang) => {
    setLang(newLang);
  };

  const registerForCompetition = async () => {
    try {
      const res = await fetch('/api/competitions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user-123'
        },
        body: JSON.stringify({
          competitionId: competition._id,
          userName: 'Prashant',
          userEmail: 'prashant@example.com'
        })
      });

      const json = await res.json();
      if (json.success) {
        setUserStatus(prev => ({ ...prev, isRegistered: true, isSubmitted: false }));
        setCompetition(prev => ({
          ...prev,
          bookedSpots: json.data.bookedSpots
        }));
        showToast(lang === 'en' ? '🎉 Successfully Registered for Competition!' : '🎉 प्रतियोगिता के लिए सफलतापूर्वक पंजीकरण हो गया!');
        return { success: true };
      } else {
        showToast(json.message);
        return { success: false, message: json.message };
      }
    } catch (err) {
      showToast('Registration failed: ' + err.message);
      return { success: false, message: err.message };
    }
  };

  const submitPerformance = async (title, videoUrl, notes) => {
    try {
      const res = await fetch('/api/competitions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user-123'
        },
        body: JSON.stringify({
          competitionId: competition._id,
          submissionTitle: title,
          videoUrl,
          notes
        })
      });

      const json = await res.json();
      if (json.success) {
        setUserStatus(prev => ({
          ...prev,
          isSubmitted: true,
          submission: json.data.submission
        }));
        showToast(lang === 'en' ? '✅ Submission uploaded successfully!' : '✅ सबमिशन सफलतापूर्वक अपलोड हो गया!');
        setShowSubmissionModal(false);
        return { success: true };
      } else {
        showToast(json.message);
        return { success: false, message: json.message };
      }
    } catch (err) {
      showToast('Submission error: ' + err.message);
      return { success: false, message: err.message };
    }
  };

  const resetState = async () => {
    try {
      await fetch('/api/competitions/reset/feedants-dance-101', { method: 'POST' });
      await fetchCompetitionData();
      showToast('Demo state reset: 19 spots available, user unregistered.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider value={{
      lang,
      toggleLanguage,
      competition,
      userStatus,
      loading,
      error,
      toast,
      showToast,
      registerForCompetition,
      submitPerformance,
      resetState,
      videoModalUrl,
      setVideoModalUrl,
      showSubmissionModal,
      setShowSubmissionModal,
      showReviewsModal,
      setShowReviewsModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
