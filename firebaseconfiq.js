import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwC6QpjlEAt6YiJcYQnjo5EJcHpNQBOn4",
  authDomain: "chat-application-21cb3.firebaseapp.com",
  projectId: "chat-application-21cb3",
  storageBucket: "chat-application-21cb3.appspot.com",
  messagingSenderId: "612462323469",
  appId: "1:612462323469:web:7d1fb0013754cf4f36b244"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Now `app` is defined
const db = getFirestore(app);

export { db, auth };
