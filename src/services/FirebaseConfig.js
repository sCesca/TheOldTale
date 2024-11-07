import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCUahk8pKiTYQBwU_b7i-WrqjLcbh2Ytsk",
  authDomain: "projeto-idle.firebaseapp.com",
  projectId: "projeto-idle",
  storageBucket: "projeto-idle.appspot.com",
  messagingSenderId: "50616074273",
  appId: "1:50616074273:web:476e7ece3207cef4d0e360",
  measurementId: "G-7Y6DC6636C"
};


const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getDatabase(app);

export { auth, db };