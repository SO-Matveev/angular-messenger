import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRKVfHyMKl6YpzY9ynzgAXWAGckuOjJ_4",
  authDomain: "angular-messenger-b9cad.firebaseapp.com",
  projectId: "angular-messenger-b9cad",
  storageBucket: "angular-messenger-b9cad.firebasestorage.app",
  messagingSenderId: "277047757767",
  appId: "1:277047757767:web:2e0521480f14517a9527e2"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов Firebase
export const auth = getAuth(app);
export const firestore = getFirestore(app);
