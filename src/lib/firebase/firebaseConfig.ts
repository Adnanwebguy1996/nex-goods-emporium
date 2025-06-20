
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
  authDomain: "nex-digital-goods.firebaseapp.com",
  projectId: "nex-digital-goods",
  storageBucket: "nex-digital-goods.appspot.com",
  messagingSenderId: "928680508282",
  appId: "YOUR_WEB_APP_ID", // Replace with your actual app ID
  measurementId: "G-YOUR_MEASUREMENT_ID" // Replace with your actual measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
