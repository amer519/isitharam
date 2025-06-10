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
    ],

    'mental-health': [
        {
          question: "Is depression a sin in Islam?",
          answer: `No, depression is not a sin. Islam acknowledges emotional struggles. The Prophet ﷺ experienced deep grief — especially during the Year of Sorrow. Feeling sadness or depression doesn’t make you a bad Muslim. What matters is continuing to seek help and turning to Allah with sincerity. [Yaqeen Institute](https://yaqeeninstitute.org/read/paper/faith-and-mental-health) explores this topic in depth.`
        },
        {
          question: "Can Muslims take antidepressants or go to therapy?",
          answer: `Yes. Islam encourages seeking treatment for all illnesses — physical or mental. The Prophet ﷺ said, “For every disease, Allah has sent down a cure.” Therapy and medication, when used responsibly, are halal. Many scholars such as Mufti Menk and Shaykh Hamza Yusuf support this approach.`
        },
        {
          question: "What duas can I say for anxiety or depression?",
          answer: `Some powerful supplications include:  
      *“Allahumma inni a’udhu bika minal-hammi wal-huzn...”* (O Allah, I seek refuge in You from anxiety and grief) — from Sahih Bukhari.  
      Reading [Surah Duha](https://quran.com/93) and [Surah Ash-Sharh (94)](https://quran.com/94) is also comforting.`
        },
        {
          question: "What did the Prophet ﷺ say about sadness or emotional pain?",
          answer: `The Prophet ﷺ experienced great sadness — including the death of his wife Khadijah and uncle Abu Talib. He would turn to Allah in prayer and dua during these moments. His life shows that even the most righteous feel sorrow — and that turning to Allah is a source of healing.`
        },
        {
          question: "How do I protect my mental health while staying religious?",
          answer: `Balance is key. Islam teaches self-care, rest, spiritual connection, and community. Burnout is real, and Allah does not burden a soul beyond what it can bear (Quran 2:286). Prioritize sleep, prayer, mindful routines, and seek support when needed.`
        },
        {
          question: "Is feeling emotionally numb a sign of weak faith?",
          answer: `Not at all. Emotional numbness can be a symptom of depression or trauma — not a reflection of your belief. Continue your acts of worship even if your heart feels distant. Allah rewards consistency, and He knows your internal struggle.`
        },
        {
          question: "How does Islam view suicidal thoughts?",
          answer: `Suicidal thoughts are serious, and you should seek help immediately — through professionals, trusted loved ones, and spiritual guidance. Islam values life deeply, and struggling does not diminish your worth. You are not alone. [SeekersGuidance](https://seekersguidance.org/answers/general-counsel/are-suicidal-thoughts-sinful-in-islam/) offers spiritual context.`
        },
        {
          question: "Can I skip salah if I’m depressed or mentally overwhelmed?",
          answer: `Salah is still obligatory, but Allah is Most Merciful and understands your pain. Try your best — even if it’s brief. You can pray sitting or lying down if needed. Maintaining prayer can bring spiritual light even in dark moments.`
        },
        {
          question: "Did any prophets experience depression or sadness?",
          answer: `Yes. Prophet Yaqub (Jacob) wept so much over the loss of Yusuf (Joseph) that he lost his eyesight (Quran 12:84). Prophet Muhammad ﷺ also grieved deeply. Their stories show us that sorrow is human, and turning to Allah is the path to healing.`
        },
        {
          question: "What surahs or verses help with anxiety and healing?",
          answer: `[Surah Duha (93)](https://quran.com/93), [Surah Inshirah (94)](https://quran.com/94), and [Ayat al-Kursi (2:255)](https://quran.com/2/255) are often recited for comfort. They remind us of Allah’s mercy, protection, and nearness.`
        }
      ],
      
      'relationships': [
        {
          question: "Is dating haram in Islam?",
          answer: `Yes, traditional dating — where two people form a romantic relationship outside of marriage — is considered haram by the majority of scholars. Islam emphasizes modesty and protecting the heart. However, getting to know someone for marriage through halal means (like chaperoned meetings or family involvement) is encouraged. [SeekersGuidance](https://seekersguidance.org/answers/general-counsel/what-is-the-islamic-view-on-dating/) explains this in depth.`
        },
        {
          question: "Can I talk to someone I want to marry?",
          answer: `Yes — as long as the interaction is respectful, purposeful, and within Islamic boundaries. Scholars recommend keeping conversations focused, modest, and avoiding private, flirtatious, or excessive chatting. Mufti Menk and Shaykh Yasir Qadhi emphasize honesty and intention during these talks.`
        },
        {
          question: "What’s the Islamic way to find a spouse?",
          answer: `There is no one-size-fits-all method. Islam allows using family, friends, imams, or even halal matrimonial services. The goal is to find a spouse in a respectful and God-conscious way. The Prophet ﷺ said, *“When someone whose religion and character you are pleased with comes to you (for marriage), then marry him…”* (Tirmidhi).`
        },
        {
          question: "Can Muslim men marry non-Muslim women?",
          answer: `Muslim men are permitted to marry women from the People of the Book (Jews and Christians), according to Quran [5:5](https://quran.com/5/5). However, scholars caution this can create long-term challenges — especially in raising children and maintaining faith-centered households.`
        },
        {
          question: "Can Muslim women marry non-Muslim men?",
          answer: `No, this is not permitted in Islam. Muslim women are only allowed to marry Muslim men. This ruling is based on scholarly consensus and aims to preserve Islamic leadership and faith in the family. [IslamQA Explanation](https://islamqa.info/en/answers/114805) covers this thoroughly.`
        },
        {
          question: "Is love before marriage haram?",
          answer: `Love itself is not haram — it is a natural emotion. However, acting on that love through private communication, physical interaction, or secret relationships is not allowed. Islam channels love toward marriage. Shaykh Abdul Nasir Jangda explains that *"pre-marital love should be protected, not exploited."*`
        },
        {
          question: "Is getting engaged before nikah allowed?",
          answer: `Yes. Engagement (*khitbah*) is an announcement of intent to marry, and it is allowed. However, an engagement does not make a couple mahram — all Islamic boundaries still apply until the nikah is performed. [Yaqeen Institute](https://yaqeeninstitute.org/read/paper/the-fiqh-of-love) offers a great primer.`
        },
        {
          question: "Is texting or flirting haram in Islam?",
          answer: `Yes — if it's between non-mahrams and involves flirtation, emotional intimacy, or lustful talk. Islam commands lowering the gaze and preserving dignity. Shaykh Faraz Rabbani explains that seemingly innocent texts often lead to emotional attachment and potential sin.`
        },
        {
          question: "What if I'm already in a haram relationship?",
          answer: `Islam is a religion of mercy and repentance. If you're in a haram relationship, seek forgiveness, cut ties with dignity, and redirect your intentions toward marriage or personal healing. Many scholars, including Mufti Menk, say the best love stories begin after tawbah.`
        },
        {
          question: "How do I know if someone is right for me Islamically?",
          answer: `The Prophet ﷺ advised looking at two things: **deen (religion)** and **akhlaq (character)**. Pray istikhara, ask trusted elders, and observe how they treat others. [SeekersGuidance: Choosing a Spouse](https://seekersguidance.org/answers/general-counsel/what-should-i-look-for-in-a-potential-spouse/) offers helpful guidance.`
        }
      ],
      
      'business': [
        {
          question: "Is it haram to charge interest or take a loan with interest (riba)?",
          answer: `Yes, dealing with riba (interest) is explicitly forbidden in Islam. The Quran in [Surah Al-Baqarah 2:275–279](https://quran.com/2/275) condemns it strongly. The Prophet ﷺ said: *“Allah has cursed the one who consumes riba, the one who gives it, the one who records it, and the two witnesses to it.”* (Sahih Muslim). Islamic finance alternatives such as profit-sharing (mudarabah) are recommended. [IslamQA Riba Fatwa](https://islamqa.info/en/answers/3097).`
        },
        {
          question: "Can Muslims work in banks or finance companies?",
          answer: `It depends on the role. Scholars generally prohibit working in conventional banks that deal with riba directly (e.g., as a loan officer). However, jobs unrelated to riba — like IT, security, or janitorial work — may be tolerated by necessity. [SeekersGuidance](https://seekersguidance.org/answers/hanafi-fiqh/is-it-permissible-to-work-for-an-interest-based-bank/) explores the nuance.`
        },
        {
          question: "Is it halal to invest in stocks and crypto?",
          answer: `Stocks and crypto can be halal if the investment is made in a Shariah-compliant company or project. Avoid businesses involving alcohol, gambling, interest, or unethical behavior. Scholars also stress avoiding speculation and excessive risk (gharar). [Yaqeen Institute: Halal Wealth](https://yaqeeninstitute.org/read/paper/halal-wealth-and-financial-wellness-in-islam) dives into this.`
        },
        {
          question: "Can I run a business that sells non-halal items to non-Muslims?",
          answer: `Selling haram items (like pork or alcohol), even to non-Muslims, is not allowed in Islam. A Muslim’s source of income should be pure and ethical. The Prophet ﷺ said, *“Every body nourished by haram will be first in the Fire.”* (Tirmidhi).`
        },
        {
          question: "What are the ethics of business in Islam?",
          answer: `Islamic business emphasizes honesty, transparency, fairness, and avoiding deceit. The Prophet ﷺ said: *“The honest, trustworthy merchant will be with the Prophets, the truthful, and the martyrs.”* (Tirmidhi). Contracts and verbal agreements must be honored.`
        },
        {
          question: "Is affiliate marketing halal?",
          answer: `Yes, affiliate marketing can be halal if the product or service you're promoting is halal, and you are honest in your marketing. Deceptive tactics or promoting haram products would make it impermissible. [IslamWeb](https://www.islamweb.net/en/fatwa/383840/ruling-on-affiliate-marketing) offers detailed guidance.`
        },
        {
          question: "Can Muslims run dropshipping businesses?",
          answer: `Dropshipping is a grey area. Scholars allow it if you take ownership of the product before reselling or if you disclose clearly that you’re a middleman. Deceptive or vague transactions are not allowed. Shaykh Faraz Khan discusses this on [SeekersGuidance](https://seekersguidance.org/answers/hanafi-fiqh/is-dropshipping-permissible-in-islam/).`
        },
        {
          question: "What is the Islamic ruling on freelancing for companies that do haram work?",
          answer: `It depends. Scholars advise avoiding direct involvement in haram services (e.g., designing casino ads). If your work is general (e.g., coding, admin) and not promoting sin, it may be tolerated temporarily while seeking halal alternatives. Intent and impact both matter.`
        },
        {
          question: "Is it halal to earn income from YouTube or social media?",
          answer: `Yes — as long as your content is halal, modest, and doesn’t promote indecency or falsehood. Showing haram content or using clickbait can make the income questionable. Intention is key, and many scholars recommend ethical guidelines for Muslim creators.`
        },
        {
          question: "Does Islam allow business competition?",
          answer: `Yes — competition is allowed and even encouraged, as long as it is fair. Undercutting others unfairly, monopolies, and slander are haram. The Prophet ﷺ allowed open markets but forbade price fixing and deceitful advertising.`
        }
      ],
      
      'halal-food': [
        {
          question: "Is gelatin halal or haram?",
          answer: `Gelatin is considered haram if derived from pigs or non-halal slaughtered animals. If it's from halal-certified or fish sources, most scholars consider it halal. [IslamQA](https://islamqa.info/en/answers/210)`
        },
        {
          question: "Can Muslims eat meat from non-Muslim countries?",
          answer: `Only if the meat is from the People of the Book (Jews or Christians) and slaughtered properly — without stunning or improper invocation. Scholars differ widely, and caution is recommended. [SeekersGuidance](https://seekersguidance.org/answers/hanafi-fiqh/can-we-eat-meat-slaughtered-by-christians-and-jews-in-the-west/).`
        },
        {
          question: "Is McDonald's food halal?",
          answer: `It depends on the country. McDonald's in some Muslim-majority countries is halal-certified. In non-Muslim countries, their meat often comes from non-halal sources. Always verify local certification.`
        },
        {
          question: "Are E-numbers (additives) halal or haram?",
          answer: `Some E-numbers are plant-based and halal. Others may be animal-derived and haram. It's important to check ingredient origin or look for halal certification. [IslamWeb](https://www.islamweb.net/en/fatwa/130364/e-numbers-and-halal-consumption)`
        },
        {
          question: "Is it halal to eat food prepared by non-Muslims?",
          answer: `Yes — as long as the food itself is halal. A non-Muslim cooking halal ingredients does not make the food haram. Intent and ingredients matter most.`
        },
        {
          question: "Are seafood like crab and lobster halal?",
          answer: `Opinions differ. Most scholars allow all seafood, but some (especially Hanafi scholars) restrict it to fish only — excluding crab, lobster, shrimp. Check with your school of thought. [IslamQA](https://islamqa.info/en/answers/20941)`
        },
        {
          question: "Can I eat at restaurants that serve alcohol?",
          answer: `Yes — but with conditions. If you're not consuming alcohol and there's no risk of fitnah (temptation), it's tolerated by some scholars. Others discourage it due to the environment.`
        },
        {
          question: "Is plant-based meat halal?",
          answer: `Yes, as long as it contains no haram additives like alcohol or enzymes from non-halal animals. Many Muslims use it as a safe alternative. [Muslim Consumer Group](https://www.muslimconsumergroup.com/) tracks ingredients.`
        },
        {
          question: "Are Muslims allowed to eat kosher food?",
          answer: `Kosher slaughter shares similarities with halal and is accepted by many scholars. However, opinions differ based on method and supervision. [SeekersGuidance](https://seekersguidance.org/answers/general-counsel/is-kosher-meat-halal/) explains the nuances.`
        },
        {
          question: "Is food containing vanilla extract halal?",
          answer: `If the vanilla extract is made using alcohol, most scholars consider it haram unless the alcohol evaporates fully and doesn't intoxicate. Look for alcohol-free or synthetic vanilla.`
        }
      ],
      
      modesty: [
        {
          question: "Is hijab mandatory in Islam?",
          answer: `Yes. Hijab is required for adult Muslim women according to [Surah An-Nur 24:31](https://quran.com/24/31) and [Surah Al-Ahzab 33:59](https://quran.com/33/59). Scholars from all four major schools of thought agree on its obligation. [Yaqeen Institute](https://yaqeeninstitute.org/read/paper/hijab-in-islam) discusses it in detail.`
        },
        {
          question: "Is it haram for women to wear tight clothing?",
          answer: `Yes — clothing that outlines the body defeats the purpose of hijab. The Prophet ﷺ warned against women who are "clothed yet naked" (Sahih Muslim). Clothes must be loose and non-transparent.`
        },
        {
          question: "Do men have a dress code in Islam?",
          answer: `Yes. Men must cover from navel to knees at minimum, and should dress modestly without showing off. Silk and gold are also haram for men, per Sahih Bukhari.`
        },
        {
          question: "Is wearing makeup in public haram?",
          answer: `Scholars agree that excessive makeup or makeup that attracts attention is not allowed in public. Simple, natural makeup with modest intent is debated. [SeekersGuidance](https://seekersguidance.org/answers/general-counsel/can-muslim-women-wear-makeup-in-public/) explains the nuances.`
        },
        {
          question: "Can Muslim women wear pants?",
          answer: `Yes — if they are loose and not form-fitting. Scholars caution that tight pants can still violate modesty, even if technically covered. Cultural context matters.`
        },
        {
          question: "Is niqab (face veil) obligatory in Islam?",
          answer: `There’s a difference of opinion. Some scholars consider niqab wajib (obligatory), while others say it is recommended but not mandatory. It is widely respected in all schools of thought. [IslamQA Niqab Fatwa](https://islamqa.info/en/answers/11774)`
        },
        {
          question: "Can women remove hijab around non-Muslim women?",
          answer: `Most scholars allow it if there’s no risk of those women describing her to men. Some advise caution depending on cultural norms. [IslamQA](https://islamqa.info/en/answers/34745)`
        },
        {
          question: "Is it haram to wear perfume in public?",
          answer: `For women, yes — if it is strong and attracts male attention. The Prophet ﷺ said, “Any woman who wears perfume and passes by people so they can smell her is an adulteress” (Sunan al-Nasa’i).`
        },
        {
          question: "Can Muslim men wear gold or silk?",
          answer: `No. The Prophet ﷺ explicitly forbade men from wearing gold or silk in multiple hadiths. It is allowed for women. [Sahih Bukhari 5837](https://sunnah.com/bukhari:5837)`
        },
        {
          question: "Are modesty rules different for converts or new Muslims?",
          answer: `No — the same rules apply. However, scholars advise new Muslims to learn and apply gradually with patience. Allah judges effort, not perfection. [SeekersGuidance](https://seekersguidance.org/answers/general-counsel/modesty-new-muslims/) offers practical advice.`
        }
      ],
      
      marriage: [
        {
          question: "What makes a nikah valid in Islam?",
          answer: `A valid nikah requires: 1) consent from both parties, 2) a wali (guardian) for the bride, 3) two Muslim witnesses, and 4) a mahr (dowry). These are agreed upon across all major schools. [IslamQA](https://islamqa.info/en/answers/2127)`
        },
        {
          question: "Can a Muslim woman marry without a wali?",
          answer: `According to most scholars, a wali is required for the nikah of a woman. The Prophet ﷺ said, “There is no marriage without a wali.” (Tirmidhi). Hanafi scholars allow it under conditions, but others do not. [SeekersGuidance](https://seekersguidance.org/answers/hanafi-fiqh/does-a-woman-need-a-wali-to-get-married/)`
        },
        {
          question: "Is forced marriage valid in Islam?",
          answer: `No. Consent is mandatory. The Prophet ﷺ nullified a marriage where a woman was married without her consent (Sahih Bukhari). Forced marriages are haram and culturally, not religiously, driven.`
        },
        {
          question: "What is the difference between nikah and civil marriage?",
          answer: `Nikah is a religious contract recognized in Islamic law. A civil marriage is a legal state contract. Muslims should ideally fulfill both, especially for legal protection in non-Muslim countries.`
        },
        {
          question: "Is it allowed to delay marriage for career or education?",
          answer: `Yes — as long as there is no risk of falling into haram. Islam encourages early marriage, but also emphasizes responsibility. [IslamQA](https://islamqa.info/en/answers/60251)`
        },
        {
          question: "Can I marry someone from a different culture or ethnicity?",
          answer: `Yes. Islam does not prohibit intercultural or interracial marriages. The Prophet ﷺ said: “There is no superiority of an Arab over a non-Arab...” (Ahmad). Compatibility and family acceptance should still be considered.`
        },
        {
          question: "Is it haram to talk to someone before marriage?",
          answer: `It’s allowed under guidelines — conversations must remain respectful, purposeful, and within Islamic limits (no flirting, privacy, or secrecy). [SeekersGuidance](https://seekersguidance.org/answers/general-counsel/is-it-permissible-to-talk-to-someone-before-marriage/)`
        },
        {
          question: "What is mahr in marriage?",
          answer: `Mahr is a mandatory gift from the groom to the bride as part of the nikah contract. It can be money, gold, or anything agreed upon. It is a right, not a favor. [IslamWeb](https://www.islamweb.net/en/fatwa/8895/)`
        },
        {
          question: "Can a woman propose marriage in Islam?",
          answer: `Yes. Women are allowed to propose — as Khadijah (RA) did to the Prophet ﷺ. It must be done respectfully and through proper Islamic channels.`
        },
        {
          question: "What is the ruling on secret marriages in Islam?",
          answer: `A nikah must be public and have witnesses. Secret marriages without a wali or announcement are discouraged and potentially invalid depending on conditions. [IslamQA](https://islamqa.info/en/answers/45563)`
        }
      ],
      
      finance: [
        {
          question: "Is paying or charging interest (riba) haram in Islam?",
          answer: `Yes — riba is one of the gravest sins in Islam. It is condemned in [Surah Al-Baqarah 2:275–279](https://quran.com/2/275). The Prophet ﷺ cursed the one who pays, charges, writes, or witnesses it (Sahih Muslim). [IslamQA](https://islamqa.info/en/answers/3097)`
        },
        {
          question: "Is it haram to take a mortgage to buy a house?",
          answer: `Conventional mortgages involve interest and are considered haram. However, Islamic alternatives like Murabaha or Ijara are allowed if structured properly. [SeekersGuidance](https://seekersguidance.org/answers/hanafi-fiqh/buying-a-house-through-an-interest-based-loan/)`
        },
        {
          question: "Is investing in the stock market halal?",
          answer: `Investing is halal if the company is Shariah-compliant — not dealing in alcohol, riba, gambling, etc. Avoid speculation and high-risk investments. [Yaqeen Institute](https://yaqeeninstitute.org/read/paper/halal-wealth-and-financial-wellness-in-islam)`
        },
        {
          question: "Is cryptocurrency halal in Islam?",
          answer: `Scholars are divided. Some permit it as a digital asset with real utility. Others caution against its volatility and speculative nature. Intent and use matter. [IslamQA](https://islamqa.info/en/answers/312925)`
        },
        {
          question: "Do Muslims have to pay Zakat on salary and savings?",
          answer: `Yes — Zakat is due on cash, savings, gold, silver, and investments if they exceed the nisab threshold after one lunar year. Salary itself isn’t zakatable unless saved. [SeekersGuidance](https://seekersguidance.org/answers/general-counsel/zakat-on-salary/)`
        },
        {
          question: "Is working in a bank haram?",
          answer: `If your job directly involves riba (e.g. loan officer), it is haram. Jobs unrelated to interest may be tolerated under necessity. [IslamQA](https://islamqa.info/en/answers/26771)`
        },
        {
          question: "Is affiliate marketing halal?",
          answer: `Yes — if the product/service is halal and you market honestly. Promoting haram goods (e.g., gambling, alcohol) makes it impermissible. [IslamWeb](https://www.islamweb.net/en/fatwa/383840/ruling-on-affiliate-marketing)`
        },
        {
          question: "Can I make money on YouTube or TikTok in Islam?",
          answer: `Yes — as long as your content is halal, modest, and not promoting haram behavior. Clickbait and immoral content compromise the income’s permissibility.`
        },
        {
          question: "Is dropshipping halal in Islam?",
          answer: `It depends. If you disclose that you don’t hold stock and customers understand, it’s allowed. Deception or selling what you don't own (without permission) is haram. [SeekersGuidance](https://seekersguidance.org/answers/hanafi-fiqh/is-dropshipping-permissible-in-islam/)`
        },
        {
          question: "Is freelancing for haram businesses allowed?",
          answer: `Avoid working for companies that promote haram directly (e.g., gambling, adult content). If your work is neutral (e.g. coding), it may be tolerated while seeking better options.`
        }
      ],

      
      
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
        <h2>
            Ask a follow-up question about {titleMap[topic]?.toLowerCase() || "this topic"}
                {topic === "music" && " 🎧"}
                {topic === "mental-health" && " 🧠"}
                {topic === "relationships" && " 💞"}
                {topic === "business" && " 💼"}
        </h2>

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