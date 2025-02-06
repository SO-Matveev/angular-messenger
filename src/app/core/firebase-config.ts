import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBRKVfHyMKl6YpzY9ynzgAXWAGckuOjJ_4",
  authDomain: "angular-messenger-b9cad.firebaseapp.com",
  projectId: "angular-messenger-b9cad",
  storageBucket: "angular-messenger-b9cad.firebasestorage.app",
  messagingSenderId: "277047757767",
  appId: "1:277047757767:web:2e0521480f14517a9527e2",
  databaseURL: 'https://angular-messenger-b9cad-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbChat = getDatabase(app);