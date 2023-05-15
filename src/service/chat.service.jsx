import {initializeApp} from "firebase/app";
import {child, getDatabase, onValue, push, ref, set} from "firebase/database";

const CONFIG = {
  databaseURL: "https://acessibilidade-dev-chat-default-rtdb.firebaseio.com",
};

const app = initializeApp(CONFIG);


let subscriptions = {};

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

export function subscription(path, callback) {
  const unsubCallback = onValue(ref(db, path), (snapshot) => {
    let vet = [];
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const value = childSnapshot.val();
      vet.push({key, ...value})
    })
    callback(vet);
  });
  subscriptions[path] = unsubCallback;
}

export async function unsubscription(path) {
  await subscriptions[path]()
}