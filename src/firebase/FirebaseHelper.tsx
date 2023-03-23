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
  doc,
  getDoc,
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

  async select(tabela: string, myWhere?: any[] | null, join?: any) {
    const db = await getFirestore(app);
    let retorno;
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
    retorno = data.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));

    if (join) {
      //seguinte vamo la explicar esse join aq.
      const joinResults = [];
      await Promise.all(
        //fiz isso pq ele recebe um array de object, ou seja diversas promises, mas com esse carinha ele só vai me retornar um, bom eu acho que funciona assim,("sim funcionou.")
        data.docs.map(async (tableMain) => {
          //pego meu select acima e rodo um foreach
          const fk = tableMain.data()[join + "Id"]; //pego dentro da tabela principal do select, a ligação da minha tabela de join
          if (fk != undefined || fk != 0) {
            // fiz isso pq as vezes me dava uns undefined mt doido
            const queryRef = query(
              //aqui eu preparo um select na tabela do join, trazendo apenas os registros que tem o mesmo id que existe na minha tabela principal.
              collection(db, join),
              where(`${join}Id`, "==", fk)
            );

            const queryParams = await getDocs(queryRef); //aqui ele vai fazer o select.
            queryParams.forEach((queryParamMain) => {
              // com os dados na mao a gnt roda um foreach e coloca dentro da lista o join, sendo {tabelaPrincipal:dados + tabelaJoin:dados}
              joinResults.push({
                id: tableMain.id, //obs se tu n passar essa poha de ID vai dar mt ruim la na frente pq ele n reconhece id e da ruim nos maps.
                ...(tableMain.data() as object),
                ...(queryParamMain.data() as object),
              });
            });
          }
        })
      );
      retorno = joinResults;
    }
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
