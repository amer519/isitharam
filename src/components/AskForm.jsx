import React, { useState } from 'react';

const AskForm = ({ onAsk }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAsk(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask a question e.g. Is smoking haram?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button type="submit">Ask</button>
    </form>
  );
};

export default AskForm;
