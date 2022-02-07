import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "wedding-application-8048c.firebaseapp.com",
  projectId: "wedding-application-8048c",
  storageBucket: "wedding-application-8048c.appspot.com",
  messagingSenderId: "40377678717",
  appId: "1:40377678717:web:c260d5c3ebbb0ba870ea14",
  measurementId: "G-QRNXCTVH3G",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
