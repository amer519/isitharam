import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const AuthButtons = () => {
  const [user] = useAuthState(auth);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("✅ Signed in with Google");
    } catch (error) {
      console.error("❌ Google sign-in error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("👋 Signed out");
    } catch (error) {
      console.error("❌ Sign out error:", error);
    }
  };

  const isAnonymous = user?.isAnonymous ?? false;
  const isRealUser = user && !isAnonymous;

  return (
    <div style={{ marginBottom: '1rem' }}>
      {isRealUser ? (
        <div>
          <p>Welcome, {user.displayName || user.email || 'User'}</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google</button>
      )}
    </div>
  );
};

export default AuthButtons;