import React, { useState } from 'react';
import AnswerCard from './AnswerCard';
import { Helmet } from 'react-helmet';

const EvergreenPage = ({ topic }) => {
  const [followUp, setFollowUp] = useState('');
  const [followUpAnswer, setFollowUpAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const titleMap = {
    music: 'Music in Islam',
    relationships: 'Relationships in Islam',
    business: 'Business in Islam',
    'mental-health': 'Mental Health in Islam'
  };

  const staticData = {
    music: [
      {
        question: "Is music haram in Islam?",
        answer: `This is one of the most debated topics. Many classical scholars such as Imam Ibn Taymiyyah and Imam al-Ghazali viewed music as impermissible due to its tendency to distract from the remembrance of Allah and lead to sin. However, some contemporary scholars — including Mufti Menk — allow it under strict conditions, such as avoiding immoral lyrics and indecent imagery.`
      },
      {
        question: "What kinds of music are permissible in Islam?",
        answer: `Permissible music is usually defined as that which contains morally uplifting lyrics, avoids sexual or violent themes, and does not involve impermissible instruments. Nasheeds without music are a common example. [SeekersGuidance Fatwa](https://seekersguidance.org/answers/general-counsel/is-music-haram-what-if-it-has-good-lyrics/) discusses this nuance in detail.`
      },
      {
        question: "Are all musical instruments haram?",
        answer: `According to a majority of scholars, most instruments are discouraged or haram based on hadiths such as those found in Sahih al-Bukhari. However, the **daf** (a simple drum) was explicitly permitted by the Prophet ﷺ during weddings and Eid. [IslamQA Reference](https://islamqa.info/en/answers/5000/the-ruling-on-music-and-singing) explains this distinction.`
      },
      {
        question: "Is it okay to listen to music while studying or working out?",
        answer: `There is no direct evidence permitting music in these contexts, but some contemporary scholars suggest it may be tolerated if it does not contain haram elements or distract from salah. Mufti Taqi Usmani and others warn against normalizing music as a coping tool over dhikr and Qur’an.`
      },
      {
        question: "What are nasheeds, and are they allowed?",
        answer: `Nasheeds are vocal songs with Islamic themes. When performed without instruments (except maybe the **daf**), they are widely accepted. Even during the Prophet’s ﷺ time, women sang with the daf to celebrate Eid. [Yaqeen Institute](https://yaqeeninstitute.org/) also notes their benefit in spiritual upliftment.`
      },
      {
        question: "Does the Quran say music is haram?",
        answer: `The Quran does not explicitly forbid music, but verse [Surah Luqman 31:6](https://quran.com/31/6) is often cited: *"And of the people is he who buys idle talk to mislead others..."* — interpreted by many scholars, including Ibn Abbas, to refer to music that distracts from Allah’s path.`
      },
      {
        question: "Can music help with mental health in Islam?",
        answer: `Some scholars recognize music’s therapeutic role but caution against full reliance. Halal alternatives like Qur’anic recitation, dhikr, and nasheeds are encouraged. Mental wellness is deeply valued in Islam — [SeekersGuidance](https://seekersguidance.org/) recommends balance rooted in Islamic principles.`
      },
      {
        question: "What if I already love music and can’t stop listening?",
        answer: `Islam emphasizes gradual improvement. Scholars recommend replacing harmful music with nasheeds, Qur’an, or beneficial podcasts. Struggling doesn't make you a bad Muslim — intention and effort matter most. Imam al-Ghazali said, *“He who strives in the path of God, even while slipping, is still on the path.”*`
      },
      {
        question: "Can Muslims produce music as a career?",
        answer: `Creating music with haram lyrics or instruments is generally discouraged. However, producing nasheeds or educational content that promotes Islamic values is considered permissible by many scholars. [IslamQA Career Guidance](https://islamqa.info/en/answers/43736) covers this with nuance.`
      },
      {
        question: "Did the Prophet ﷺ ever speak about music?",
        answer: `Yes. Several hadiths warn against musical instruments (e.g., Sahih Bukhari 5590), yet others allow the daf during celebrations. Scholars agree context matters — celebrations may allow leniency while general entertainment may not. Ibn Hajar and Imam Nawawi both interpret this with nuance.`
      }
    ]
  };

  const questions = staticData[topic] || [];
  const pageTitle = titleMap[topic] || 'Islamic Topic';

  const handleFollowUp = async () => {
    if (!followUp.trim()) return;
    setLoading(true);
    setFollowUpAnswer('');

    try {
      const { fetchAIAnswer } = await import('../utils/fetchAnswer');
      const response = await fetchAIAnswer(followUp);
      setFollowUpAnswer(response);
    } catch (err) {
      setFollowUpAnswer("❌ Error fetching answer. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="page-container">
      <Helmet>
        <title>{pageTitle} | IsItHaram.ai</title>
        <meta
          name="description"
          content={`Explore Islamic guidance on ${pageTitle.toLowerCase()} — including common questions and answers.`}
        />
      </Helmet>

      <div className="glass-box">
        <h1>{pageTitle}</h1>
        <p>Explore common questions Muslims ask about {pageTitle.toLowerCase()}.</p>

        {questions.map((q, index) => (
          <section key={index} className="qa-block">
            <h2>{q.question}</h2>
            <AnswerCard answer={q.answer} />
          </section>
        ))}

        <div className="followup-box">
          <h2>Ask a follow-up question about music 🎧</h2>
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Type your question..."
            className="followup-input"
          />
          <button onClick={handleFollowUp} className="followup-button">Ask</button>
          {loading && <p>Loading...</p>}
          {followUpAnswer && (
            <div className="followup-answer">
              <AnswerCard answer={followUpAnswer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvergreenPage;