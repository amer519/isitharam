import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const AnswerCard = ({ question, answer }) => {
  const cardRef = useRef();

  let ruling = '';
  let explanation = answer;
  let sourceText = '';

  // Extract source
  const sourceMatch = answer.match(/\(([^()]*?(islamqa|seekersguidance|darulifta|halal|haram)[^()]*)\)/i);
  if (sourceMatch) {
    sourceText = sourceMatch[1];
    explanation = answer.replace(sourceMatch[0], '').trim();
  }

  // Extract ruling
  const rulingMatch = explanation.match(/^(✅|❌|⚠️)?\s*\b[A-Z][^.:!?]+[:.]/);
  if (rulingMatch) {
    ruling = rulingMatch[0].trim();
    explanation = explanation.slice(ruling.length).trim();
  }

  // 📥 Download card as image
  const downloadAsImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `isitharam-answer.png`;
    link.href = dataURL;
    link.click();
  };

  // 🔗 Share card as image
  const shareImage = async () => {
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
  
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'isitharam-answer.png', { type: 'image/png' });
  
      // ✅ Check browser support for navigator.canShare with files
      if (
        typeof navigator.canShare !== 'function' ||
        !navigator.canShare({ files: [file] })
      ) {
        alert('Sharing is only supported on mobile browsers like Chrome or Safari. You can still save the image instead.');
        return;
      }
  
      try {
        await navigator.share({
          title: 'Is It Haram or Halal?',
          text: 'Check out this Islamic answer.',
          files: [file],
        });
      } catch (err) {
        alert('Sharing failed. Please try again.');
      }
    }, 'image/png');
  };  

  return (
    <div>
      <div ref={cardRef} className="answer-card image-card">
        <div className="answer-overlay">
          <h3 className="answer-question">❓ {question}</h3>

          {ruling && (
            <p className="answer-ruling">📌 Verdict: {ruling}</p>
          )}

          {explanation && (
            <p className="answer-explanation">
              <strong>💬 Explanation:</strong><br />
              {explanation}
            </p>
          )}

          {sourceText && (
            <p className="answer-source">
              <strong>📚 Source:</strong>{' '}
              {sourceText.startsWith('http') ? (
                <a href={sourceText} target="_blank" rel="noopener noreferrer">{sourceText}</a>
              ) : (
                sourceText
              )}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={downloadAsImage}>📥 Save as Image</button>
        <button onClick={shareImage}>🔗 Share with Friends</button>
      </div>
    </div>
  );
};

export default AnswerCard;