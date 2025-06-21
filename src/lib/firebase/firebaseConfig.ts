
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6V2vAKVuPPiqbynTAdc0bwmVmeF9nvWM",
  authDomain: "nex-digital-goods.firebaseapp.com",
  projectId: "nex-digital-goods",
  storageBucket: "nex-digital-goods.firebasestorage.app",
  messagingSenderId: "928680508282",
  appId: "1:928680508282:web:378d610dac4312ec2b74c3",
  measurementId: "G-BRDKWZH5ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
