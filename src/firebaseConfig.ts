import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCo37vx49-Dl_aVHwnKrDq-TAoTNffoMok",
  authDomain: "movie-tracker-f93da.firebaseapp.com",
  projectId: "movie-tracker-f93da",
  storageBucket: "movie-tracker-f93da.firebasestorage.app",
  messagingSenderId: "837936360815",
  appId: "1:837936360815:web:9e98c3e7b6d239e5f18c9a",
  measurementId: "G-G0G26Y31G3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true 
});