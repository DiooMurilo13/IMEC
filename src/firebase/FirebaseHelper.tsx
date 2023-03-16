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
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app, auth, db } from "./Auth";

export class Database {
  async insert(table: string, value: any[], hist: any[]) {
    const tab = collection(db, table);
    let histRef = [];
    if (hist !== null) histRef = Array.from(hist.values());

    {
      value &&
        value.map(async (v, i) => {
          try {
            const docRef = await addDoc(tab, v);
            if (histRef.length >= 1) {
              const tabRef = collection(db, `${table}/${docRef.id}/historico`);
              await addDoc(tabRef, histRef[i]);
            }
          } catch (e) {
            console.log(e);
          }
        });
    }
  }

  async select(tabela?: string, myWhere?: any[]) {
    const db = await getFirestore(app);

    let collectionRef;
    if (myWhere) {
      const conditions = myWhere.map((v) => {
        return where(v.collumn, v.condition, v.value);
      });

      collectionRef = query(collection(db, tabela), ...conditions);
    } else {
      collectionRef = collection(db, tabela);
    }

    const data = await getDocs(collectionRef);
    const retorno = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));

    return retorno;
  }
  async cadastrar(data) {
    await createUserWithEmailAndPassword(auth, data.login, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async validaLogar() {
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

  async deslogar() {
    await auth.signOut();
    await AsyncStorage.removeItem("login");
    await AsyncStorage.removeItem("senha");
  }

  async logar(data) {
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
}
