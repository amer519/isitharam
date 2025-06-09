import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const AuthButtons = () => {
  const [user] = useAuthState(auth);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return user ? (
    <div>
      <p>Welcome, {user.displayName}</p>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  ) : (
    <button onClick={login}>Sign in with Google</button>
  );
};

export default AuthButtons;