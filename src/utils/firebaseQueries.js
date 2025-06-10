import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path as needed

export const getQuestionsByCategory = async (category) => {
  const q = query(
    collection(db, 'questions'),
    where('category', '==', category)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};