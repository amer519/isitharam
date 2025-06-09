import React from 'react';

const AnswerCard = ({ question, answer }) => {
  let ruling = '';
  let explanation = answer;
  let sourceText = '';

  // Extract (Source: ...)
  const sourceMatch = answer.match(/\(Source:\s*(.*?)\)/i);
  if (sourceMatch) {
    sourceText = sourceMatch[1];
    explanation = answer.replace(sourceMatch[0], '').trim();
  }

  // Extract ruling (e.g., ✅ Halal:)
  const rulingMatch = explanation.match(/^(✅|❌|⚠️)?\s*\b([A-Z][^.:!?]+):/);
  if (rulingMatch) {
    ruling = rulingMatch[0].trim();
    explanation = explanation.slice(ruling.length).trim();
  }

  return (
    <div className="answer-card">
      <h3>❓ {question}</h3>

      {ruling && (
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem' }}>
          📌 Verdict: <span style={{ color: '#C97D60' }}>{ruling}</span>
        </p>
      )}

      {explanation && (
        <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
          <strong>💬 Explanation:</strong><br />
          {explanation}
        </p>
      )}

      {sourceText && (
        <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
          <strong>📚 Source:</strong>{' '}
          {sourceText.startsWith('http') ? (
            <a href={sourceText} target="_blank" rel="noopener noreferrer">
              {sourceText}
            </a>
          ) : (
            sourceText
          )}
        </p>
      )}
    </div>
  );
};

export default AnswerCard;