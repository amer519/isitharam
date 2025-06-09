import { db, auth } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export const checkUserQuota = async () => {
  const user = auth.currentUser;
  const today = new Date().toDateString();

  // ✅ Logged-in users (tracked in Firestore)
  if (user) {
    const ref = doc(db, "usage", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, { count: 1, date: today, updatedAt: serverTimestamp() });
      return 2;
    }

    const data = snap.data();
    if (data.date !== today) {
      await updateDoc(ref, { count: 1, date: today, updatedAt: serverTimestamp() });
      return 2;
    }

    if (data.count >= 3) return 0;

    await updateDoc(ref, { count: data.count + 1, updatedAt: serverTimestamp() });
    return 3 - (data.count + 1);
  }

  // ✅ Anonymous users (tracked in localStorage)
  const localKey = `isitharam-usage-${today}`;
  let count = Number(localStorage.getItem(localKey) || 0);

  if (count >= 3) return 0;

  count++;
  localStorage.setItem(localKey, count);
  return 3 - count;
};