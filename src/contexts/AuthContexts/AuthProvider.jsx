import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth} from '../../firebase/firebase.init'

const AuthProvider = ({children}) => {
  const googleProvider = new GoogleAuthProvider();
      const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);

      const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
      };

        // Login user
  const loginUser = (email, password) => {
   setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

    // google login

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
    
useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("user change", currentUser);
    });
    return () => {
      unSubscribe();
    };
},[]);


  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };


    const authInfo = {
        user,
        loading,
        createUser,
        loginWithGoogle,
        loginUser,
        logoutUser
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;