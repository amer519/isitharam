import React from 'react';
import AskForm from './components/AskForm';
import AnswerCard from './components/AnswerCard';
import './App.css';
import AuthButtons from './components/AuthButtons';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { checkUserQuota } from './utils/usageTracker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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
      const { fetchAIAnswer } = await import('./utils/fetchAnswer');
      const response = await fetchAIAnswer(q);
      setAnswer(response);
    } catch (err) {
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

  return (
    <div className="container">
      <h1>Is It Haram or Halal?</h1>
  
      {/* 🔥 Wrap sign-in buttons in a div for styling */}
      <div className="auth-buttons">
        <AuthButtons />
      </div>
  
      <AskForm onAsk={handleAsk} />
  
      {loading && <p>Loading...</p>}
  
      {answer && (
        <div>
          <AnswerCard question={question} answer={answer} />
          {/* {user && (
            <button onClick={() => saveAnswer(question, answer)}>💾 Save Answer</button>
          )} */}
        </div>
      )}
    </div>
  );  
}

export default App;