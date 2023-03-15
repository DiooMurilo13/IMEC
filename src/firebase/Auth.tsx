// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3cSXG6_RFuZBvCTDUi_O8fsdv2iHRKxY",
  authDomain: "scalebuilder-cb3c0.firebaseapp.com",
  projectId: "scalebuilder-cb3c0",
  storageBucket: "scalebuilder-cb3c0.appspot.com",
  messagingSenderId: "1010121486002",
  appId: "1:1010121486002:web:245e425da0fa48363de3ab",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
