import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState } from "react";

function App() {
  // TODO: Replace the following with your app's Firebase project configuration
  // See: https://firebase.google.com/docs/web/learn-more#config-object
  const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://acessibilidade-dev-chat-default-rtdb.firebaseio.com",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize Realtime Database and get a reference to the service
  const db = getDatabase(app);
  let userId;
  async function writeUserData(e, name, email) {
    e.preventDefault();
    userId = Math.floor(Math.random() * 1000000000);
    // console.log(userId, name, email);
    await set(ref(db, "users/" + userId), {
      username: name,
      email: email,
    });
    const userRef = ref(db, "users/" + userId);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setCreateUser(data);
      // updateStarCount(postElement, data);
    });
  }

  const [createUser, setCreateUser] = useState("");

  return (
    <>
      <h1>App</h1>
      <form
        action=""
        onSubmit={(e) => writeUserData(e, userName.value, email.value)}
      >
        <label htmlFor="userName">Nome</label>
        <br />
        <input type="text" name="name" id="userName" />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input type="text" name="email" id="email" />
        <br />
        <button type="submit">Enviar</button>
      </form>
      <p>{JSON.stringify(createUser)}</p>
    </>
  );
}

export default App;
