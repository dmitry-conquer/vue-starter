import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQgRDFaHqavtfrch_Z_FVYeHsdbqk4mGY",
  authDomain: "conquer-chat.firebaseapp.com",
  projectId: "conquer-chat",
  storageBucket: "conquer-chat.appspot.com",
  messagingSenderId: "127211198379",
  appId: "1:127211198379:web:866b122760d3d0b2fea4ee",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
