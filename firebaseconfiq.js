import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_apiKey,
  // authDomain: import.meta.env.VITE_authDomain,
  // projectId: import.meta.env.VITE_projectId,
  // storageBucket:  import.meta.env.VITE_storageBucke,
  // messagingSenderId:  import.meta.env.VITE_messagingSenderId,
  // appId: import.meta.env.VITE_apiKey,
  apiKey: "AIzaSyDwC6QpjlEAt6YiJcYQnjo5EJcHpNQBOn4",
  authDomain: "chat-application-21cb3.firebaseapp.com",
  projectId: "chat-application-21cb3",
  storageBucket: "chat-application-21cb3.firebasestorage.app",
  messagingSenderId: "612462323469",
  appId: "1:612462323469:web:7d1fb0013754cf4f36b244"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
