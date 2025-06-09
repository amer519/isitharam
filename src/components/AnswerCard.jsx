import React from 'react';

const AnswerCard = ({ question, answer }) => {
  let ruling = '';
  let explanation = answer;
  let sourceText = '';

  // Extract source in parentheses (even without "Source:")
  const sourceMatch = answer.match(/\(([^()]*?(islamqa|seekersguidance|darulifta|halal|haram)[^()]*)\)/i);
  if (sourceMatch) {
    sourceText = sourceMatch[1];
    explanation = answer.replace(sourceMatch[0], '').trim();
  }

  // Extract ruling (e.g. ✅ Permissible.)
  const rulingMatch = explanation.match(/^(✅|❌|⚠️)?\s*\b[A-Z][^.:!?]+[:.]/);
  if (rulingMatch) {
    ruling = rulingMatch[0].trim();
    explanation = explanation.slice(ruling.length).trim();
  }

  return (
    <div className="answer-card" style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>❓ {question}</h3>

      {ruling && (
        <p style={{
          fontWeight: 'bold',
          fontSize: '1.2rem',
          color: '#C97D60',
          marginBottom: '1rem'
        }}>
          📌 Verdict: {ruling}
        </p>
      )}

      {explanation && (
        <p style={{
          lineHeight: '1.6',
          fontSize: '1rem',
          marginBottom: '1.2rem'
        }}>
          <strong>💬 Explanation:</strong><br />
          {explanation}
        </p>
      )}

      {sourceText && (
        <p style={{
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: '#444'
        }}>
          <strong>📚 Source:</strong>{' '}
          {sourceText.startsWith('http') ? (
            <a href={sourceText} target="_blank" rel="noopener noreferrer">{sourceText}</a>
          ) : (
            sourceText
          )}
        </p>
      )}
    </div>
  );
};

export default AnswerCard;