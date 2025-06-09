import React from 'react';

const AnswerCard = ({ question, answer }) => {
  let ruling = '';
  let explanation = answer;
  let sourceText = '';

  // Try to extract source in parentheses at end
  const sourceMatch = answer.match(/\(Source:\s*(.*?)\)/i);
  if (sourceMatch) {
    sourceText = sourceMatch[1];
    explanation = answer.replace(sourceMatch[0], '').trim(); // remove from explanation
  }

  // Try to extract the "ruling" (emoji + few words before the main body)
  const rulingMatch = explanation.match(/^(✅|❌|⚠️)?\s*\b[A-Z][^.:!?]+[:.]/);
  if (rulingMatch) {
    ruling = rulingMatch[0].trim();
    explanation = explanation.slice(ruling.length).trim();
  }

  return (
    <div className="answer-card">
      <h3>Q: {question}</h3>
      {ruling && <p><strong>{ruling}</strong></p>}
      <p>{explanation}</p>
      {sourceText && (
        <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
          <strong>Source:</strong> {sourceText.startsWith('http') ? (
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