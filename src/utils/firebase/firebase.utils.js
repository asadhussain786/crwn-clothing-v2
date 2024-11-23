import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDxK8NBBryO28-G9O41qJCokeShJUmAKY",
    authDomain: "crwn-clothing-db-ddb99.firebaseapp.com",
    projectId: "crwn-clothing-db-ddb99",
    storageBucket: "crwn-clothing-db-ddb99.firebasestorage.app",
    messagingSenderId: "867263765113",
    appId: "1:867263765113:web:ec6bf080aa609b1dc152a8",
    measurementId: "G-9JCZTV4PVB"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  export const db = getFirestore(); 

  export const createUserDocumentFromAuth = async (userAuth, 
    additionalInformation = {} ) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    
   

    const userSnapshot = await getDoc(userDocRef);
    

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef;
  };

  // export const createAuthUserWithEmailAndPassword = async (email, password) => {
  //   if(!email || !password) return;
  //   return await createAuthUserWithEmailAndPassword(auth, email, password);

  // };
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};