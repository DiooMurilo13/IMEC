// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/firestore";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  Query,
  query,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { useState } from "react";

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

export enum condition {
  EQUALS = "==",
}

export interface IWhere {
  collumn: string;
  condition: condition;
  value: string;
}

export function MyWhere(collumn, condition, value): IWhere {
  const data = {
    collumn: collumn,
    condition: condition,
    value: value,
  };

  return data;
}

export async function Add(table: string, value: any) {
  const tab = collection(db, table);

  {
    value &&
      value.map(async (v) => {
        try {
          const ref = await addDoc(tab, v);
          console.log(ref.id);
        } catch (e) {
          console.log(e);
        }
      });
  }
}

export async function AddCliente() {
  const usuariosRef = collection(db, "Clientes");
  // Adiciona um novo usuário
  const novoUsuario = {
    Nome: "pedrinho",
    Sobrenome: "delas",
    Celular: 69999991111,
  };

  const usuHist = {
    Acao: "Cadastrou",
  };

  try {
    const docRef = await addDoc(usuariosRef, novoUsuario);
    const ausuariosRef = collection(db, `Clientes/${docRef.id}/Historico`);
    const docHist = await addDoc(ausuariosRef, usuHist);
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
}

export async function Get(tabela?: string, myWhere?: any) {
  const db = getFirestore(app);

  let collectionRef;
  if (myWhere) {
    collectionRef = query(
      collection(db, tabela),
      where(myWhere.collumn, myWhere.condition, myWhere.value)
    );
  } else collectionRef = collection(db, tabela);

  const data = await getDocs(collectionRef);
  const retorno = data.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as object),
  }));

  return retorno;
}
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

export async function validaLogar() {
  try {
    const login = await AsyncStorage.getItem("login");
    const senha = await AsyncStorage.getItem("senha");
    if (login !== null && senha !== null) {
      await signInWithEmailAndPassword(auth, login, senha)
        .then((userCredential) => {
          const user = userCredential.user;
          return true;
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          return false;
        });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deslogar() {
  await auth.signOut();
  await AsyncStorage.removeItem("login");
  await AsyncStorage.removeItem("senha");
}

export async function logar(data) {
  const auth = getAuth();

  await signInWithEmailAndPassword(auth, data.login, data.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      try {
        await AsyncStorage.removeItem("login");
        await AsyncStorage.removeItem("senha");
        await AsyncStorage.setItem("login", data.login);
        await AsyncStorage.setItem("senha", data.password);
      } catch (error) {
        console.log(error);
      }
    })

    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export { auth, db };
