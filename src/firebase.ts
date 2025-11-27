import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVKs5VBxCvKLGvZTfZvZkqKLFWUNFBFlE",
  authDomain: "ground-shield-758d1.firebaseapp.com",
  projectId: "ground-shield-758d1",
  storageBucket: "ground-shield-758d1.firebasestorage.app",
  messagingSenderId: "231048124714",
  appId: "1:231048124714:web:9ed2bef40c4c2429c3e653",
  measurementId: "G-8K3S1ZEB22"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);