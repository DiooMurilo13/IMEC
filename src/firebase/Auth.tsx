// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  indexedDBLocalPersistence,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/firestore";

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

export async function cadastrar(data) {
  await createUserWithEmailAndPassword(auth, data.login, data.password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function logar(data) {
  const auth = getAuth();

  await signInWithEmailAndPassword(auth, data.login, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export { auth };
