import {initializeApp} from "firebase/app";
import {child, getDatabase, onValue, push, ref, set} from "firebase/database";

const CONFIG = {
  databaseURL: "https://acessibilidade-dev-chat-default-rtdb.firebaseio.com",
};

const app = initializeApp(CONFIG);

export const getDb = () => {
  return getDatabase(app);
}

const db = getDb();

export async function writeData(name, email) {
  // pegar uma chave para o novo usuário
  let userId = push(child(ref(db), 'users')).key;

  const userRef = ref(db, "users/" + userId);

  try {
    await set(userRef, {
      username: name,
      email: email,
    });
    console.log("Usuario criado com sucesso")
  } catch (e) {
    console.error(e.message);
  }
}

export function getObservable(path, callback){
  return onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val();
    let vet = []
    for (const [key, value] of Object.entries(data)) {
      console.log({key, ...value});
      vet.push(value)
    }
    callback(vet)
  });
}