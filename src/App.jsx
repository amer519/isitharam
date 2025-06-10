// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AskForm from './components/AskForm';
import AnswerCard from './components/AnswerCard';
import AuthButtons from './components/AuthButtons';
import EvergreenPage from './components/EvergreenPage'; // ✅ NEW
import './App.css';

import { auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { checkUserQuota } from './utils/usageTracker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

function HomePage() {
  const [user] = useAuthState(auth);
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!auth.currentUser) {
      signInAnonymously(auth)
        .then(() => {
          console.log("✅ Signed in anonymously");
        })
        .catch((error) => {
          console.error("❌ Anonymous sign-in failed:", error);
        });
    }
  }, []);

  const handleAsk = async (q) => {
    setQuestion(q);
    setLoading(true);

    const remaining = await checkUserQuota();
    if (remaining <= 0) {
      setAnswer("❌ You've hit the free limit. Come back tomorrow or upgrade.");
      setLoading(false);
      return;
    }

    try {
      console.log("🔍 Submitting question to AI...");
      const { fetchAIAnswer } = await import('./utils/fetchAnswer');
      const response = await fetchAIAnswer(q);
      console.log("✅ Got AI response:", response);

      setAnswer(response);
      await savePublicQuestion(q, response);

    } catch (err) {
      console.error("❌ Error in handleAsk:", err);
      setAnswer("Error fetching answer. Try again.");
    }

    setLoading(false);
  };

  const saveAnswer = async (question, answer) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await addDoc(collection(db, "users", uid, "saved"), {
      question,
      answer,
      createdAt: serverTimestamp()
    });
  };

  const savePublicQuestion = async (question, answer) => {
    try {
      const payload = {
        question,
        answer,
        category: detectCategory(question),
        uid: auth.currentUser?.uid || null,
        createdAt: serverTimestamp()
      };

      console.log("🔥 Saving question with payload:", payload);

      const docRef = await addDoc(collection(db, "questions"), payload);
      console.log("✅ Saved question to Firestore with ID:", docRef.id);

    } catch (err) {
      console.error("❌ Firestore save error:", err);
    }
  };

  const detectCategory = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('music') || lower.includes('song')) return 'music';
    if (lower.includes('marriage') || lower.includes('love') || lower.includes('dating')) return 'relationships';
    if (lower.includes('money') || lower.includes('job') || lower.includes('riba') || lower.includes('business')) return 'business';
    if (lower.includes('anxiety') || lower.includes('mental') || lower.includes('depression')) return 'mental-health';
    return 'general';
  };

  return (
    <div className="container">
      <h1>Is It Haram or Halal?</h1>

      <div className="auth-buttons">
        <AuthButtons />
      </div>

      <AskForm onAsk={handleAsk} />

      {loading && <p>Loading...</p>}

      {answer && (
        <div>
          <AnswerCard question={question} answer={answer} />
        </div>
      )}
    </div>
  );
}

// ✅ Wrap the homepage + evergreen routing
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/music-in-islam" element={<EvergreenPage topic="music" />} />
      <Route path="/relationships-in-islam" element={<EvergreenPage topic="relationships" />} />
      <Route path="/business-in-islam" element={<EvergreenPage topic="business" />} />
      <Route path="/mental-health-in-islam" element={<EvergreenPage topic="mental-health" />} />
      <Route path="/halal-food-in-islam" element={<EvergreenPage topic="halal-food" />} />
      <Route path="/modesty-in-islam" element={<EvergreenPage topic="modesty" />} />
      <Route path="/marriage-in-islam" element={<EvergreenPage topic="marriage" />} />
      <Route path="/finance-in-islam" element={<EvergreenPage topic="finance" />} />

    </Routes>
  );
}

export default App;